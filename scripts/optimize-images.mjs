// Resize + recompress source photos into assets/photos (imported statically by next/image).
// Usage: node scripts/optimize-images.mjs <source_dir>
import sharp from 'sharp';
import { readdir, mkdir } from 'node:fs/promises';
import path from 'node:path';

const src = process.argv[2];
const out = path.resolve('assets/photos');
await mkdir(out, { recursive: true });
for (const f of await readdir(src)) {
  if (!/\.(jpe?g|png)$/i.test(f)) continue;
  const name = f.replace(/\.(jpe?g|png)$/i, '.jpg');
  const info = await sharp(path.join(src, f))
    .rotate()
    .resize({ width: 2400, height: 2400, fit: 'inside', withoutEnlargement: true })
    .jpeg({ quality: 80, mozjpeg: true, progressive: true })
    .toFile(path.join(out, name));
  console.log(name, info.width + 'x' + info.height, Math.round(info.size / 1024) + 'KB');
}
