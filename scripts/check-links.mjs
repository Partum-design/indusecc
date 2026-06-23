import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const ignoredDirs = new Set(['.git', 'node_modules']);
const apiRoutes = new Set(['/api/send-auditoria', '/api/create-course-preference']);
const ignoredPrefixes = ['/cdn-cgi/'];

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    if (ignoredDirs.has(entry.name)) continue;

    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...walk(fullPath));
    } else if (entry.isFile() && /\.(html|css|js)$/i.test(entry.name)) {
      files.push(fullPath);
    }
  }

  return files;
}

function decodeHtml(value) {
  return value
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'");
}

function stripQueryAndHash(value) {
  return value.split('#')[0].split('?')[0];
}

function isIgnoredUrl(value) {
  return (
    !value ||
    value === '#' ||
    value.startsWith('#') ||
    value.startsWith('data:') ||
    value.startsWith('mailto:') ||
    value.startsWith('tel:') ||
    value.startsWith('sms:') ||
    value.startsWith('javascript:')
  );
}

function fileExists(targetPath) {
  if (fs.existsSync(targetPath)) return true;
  if (fs.existsSync(path.join(targetPath, 'index.html'))) return true;
  if (!path.extname(targetPath) && fs.existsSync(`${targetPath}.html`)) return true;
  return false;
}

function resolveLocalUrl(rawUrl, sourceFile, warnings) {
  const value = decodeHtml(rawUrl.trim());
  if (isIgnoredUrl(value)) return null;

  if (value.startsWith('//')) {
    const host = value.slice(2).split('/')[0];
    if (!host.includes('.')) {
      warnings.push({ sourceFile, url: value, reason: 'posible ruta local escrita como URL externa' });
    }
    return null;
  }

  if (/^[a-z][a-z0-9+.-]*:/i.test(value)) return null;

  const cleanValue = stripQueryAndHash(value);
  if (!cleanValue) return null;
  if (apiRoutes.has(cleanValue)) return null;
  if (cleanValue.startsWith('/api/')) return null;
  if (ignoredPrefixes.some((prefix) => cleanValue.startsWith(prefix))) return null;

  let decodedPath;
  try {
    decodedPath = decodeURIComponent(cleanValue);
  } catch {
    decodedPath = cleanValue;
  }

  const targetPath = decodedPath.startsWith('/')
    ? path.join(root, decodedPath)
    : path.resolve(path.dirname(sourceFile), decodedPath);

  return targetPath;
}

function collectUrls(filePath) {
  const text = fs.readFileSync(filePath, 'utf8');
  const urls = [];
  const attrPattern = /\b(?:href|src|action|poster)\s*=\s*(["'])(.*?)\1/gi;
  const srcsetPattern = /\bsrcset\s*=\s*(["'])(.*?)\1/gi;
  const cssUrlPattern = /url\(\s*(["']?)(.*?)\1\s*\)/g;
  const refreshPattern = /http-equiv\s*=\s*(["'])refresh\1[\s\S]{0,160}?content\s*=\s*(["'])[^"']*url=([^"']+)\2/gi;

  for (const match of text.matchAll(attrPattern)) {
    urls.push(match[2]);
  }

  for (const match of text.matchAll(srcsetPattern)) {
    for (const item of match[2].split(',')) {
      const [url] = item.trim().split(/\s+/);
      if (url) urls.push(url);
    }
  }

  for (const match of text.matchAll(cssUrlPattern)) {
    urls.push(match[2]);
  }

  for (const match of text.matchAll(refreshPattern)) {
    urls.push(match[3]);
  }

  return urls;
}

const broken = [];
const warnings = [];

for (const file of walk(root)) {
  for (const url of collectUrls(file)) {
    const targetPath = resolveLocalUrl(url, file, warnings);
    if (!targetPath) continue;

    if (!targetPath.startsWith(root) || !fileExists(targetPath)) {
      broken.push({
        file: path.relative(root, file),
        url,
        target: path.relative(root, targetPath)
      });
    }
  }
}

if (warnings.length) {
  console.warn('Advertencias:');
  for (const item of warnings) {
    console.warn(`- ${path.relative(root, item.sourceFile)} -> ${item.url} (${item.reason})`);
  }
}

if (broken.length) {
  console.error('Enlaces o recursos locales no encontrados:');
  for (const item of broken) {
    console.error(`- ${item.file} -> ${item.url} (${item.target})`);
  }
  process.exit(1);
}

console.log('OK: enlaces y recursos locales encontrados.');
