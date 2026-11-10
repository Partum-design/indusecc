"""One-off: pull article content out of the legacy static HTML into JSON for the Next.js app.
Usage: python3 scripts/extract-legacy-content.py <legacy_root> <out_dir>"""
import re, json, sys, html, pathlib

root = pathlib.Path(sys.argv[1]); out = pathlib.Path(sys.argv[2])
(out / 'posts').mkdir(parents=True, exist_ok=True)

def text(s):
    return re.sub(r'\s+', ' ', html.unescape(re.sub(r'<[^>]+>', '', s))).strip()

def inner(s, cls, tag='[a-z]+'):
    m = re.search(r'<(%s)\b[^>]*class="%s"[^>]*>' % (tag, re.escape(cls)), s)
    if not m: return ''
    t = m.group(1); i = m.end(); depth = 1
    for mm in re.finditer(r'<(/?)%s\b[^>]*>' % t, s[i:]):
        depth += -1 if mm.group(1) else 1
        if depth == 0: return s[i:i + mm.start()]
    return ''

def clean(h):
    h = re.sub(r'<(script|style)\b.*?</\1>', '', h, flags=re.S)
    h = re.sub(r'<button class="iso-back-top".*?</button>', '', h, flags=re.S)
    h = re.sub(r'\s(data-r|data-split|data-speed|style)="[^"]*"', '', h)
    h = re.sub(r'<img ', '<img loading="lazy" decoding="async" ', h)
    h = h.replace('target="_blank" rel="noopener"', 'target="_blank" rel="noopener noreferrer"')
    h = re.sub(r'\n\s*\n+', '\n', h)
    return html.unescape(h).strip()

def meta(s, prop):
    m = re.search(r'<meta (?:name|property)="%s" content="([^"]*)"' % re.escape(prop), s)
    return html.unescape(m.group(1)) if m else ''

def hero(s):
    h1 = re.search(r'<h1[^>]*>(.*?)</h1>', s, re.S).group(1)
    h1 = re.sub(r'<span class="ln"><span[^>]*>(.*?)</span></span>', r'\1|', h1)
    lines = [html.unescape(x).strip() for x in h1.split('|') if x.strip()]
    hm = re.search(r'class="hero-meta"[^>]*><span class="dot"></span>(.*?)</div>', s, re.S)
    sub = re.search(r'class="hero-sub"[^>]*>(.*?)</p>', s, re.S)
    tags = re.findall(r'<span>([^<]*)</span>', inner(s, 'hero-tags'))
    return lines, text(hm.group(1)) if hm else '', text(sub.group(1)) if sub else '', [html.unescape(t) for t in tags]

# Blog index cards
idx = (root / 'blog/index.html').read_text()
cards = {}
for m in re.finditer(r'<article class="hub-card[^"]*"([^>]*)>(.*?)</article>', idx, re.S):
    attrs, body = m.group(1), m.group(2)
    a = dict(re.findall(r'data-([a-z-]+)="([^"]*)"', attrs))
    slug = a['link'].rstrip('/').split('/')[-1]
    meta_txt = text(re.search(r'class="hub-meta">(.*?)</span>', body, re.S).group(1))
    rt = re.search(r'lectura (\d+) min', meta_txt)
    cards[slug] = {
        'tag': text(re.search(r'class="hub-tag">(.*?)</span>', body, re.S).group(1)).replace('Nuevo · ', ''),
        'excerpt': text(re.search(r'class="hub-desc">(.*?)</p>', body, re.S).group(1)),
        'keywords': html.unescape(a.get('search', '')),
        'readMinutes': int(rt.group(1)) if rt else 6,
        'featured': 'hub-card--featured' in m.group(0)[:60],
    }

posts = []
for f in sorted((root / 'blog').glob('*/index.html')):
    s = f.read_text(); slug = f.parent.name
    lines, hmeta, sub, tags = hero(s)
    ld = re.search(r'"datePublished":\s*"([^"]+)"', s)
    title = meta(s, 'og:title') or text(re.search(r'<title>(.*?)</title>', s).group(1)).split(' | ')[0]
    img = meta(s, 'og:image').replace('https://www.indusecc.com.mx', '')
    post = {
        'slug': slug, 'title': title, 'seoTitle': text(re.search(r'<title>(.*?)</title>', s).group(1)),
        'description': meta(s, 'description'), 'ogDescription': meta(s, 'og:description'),
        'date': ld.group(1) if ld else '', 'image': img, 'category': hmeta.split('·')[0].strip(),
        'heroLines': lines, 'lead': sub, 'tags': tags,
        'body': clean(inner(s, 'iso-main', 'article')), 'aside': clean(inner(s, 'iso-side', 'aside')),
        **cards.get(slug, {'tag': hmeta.split('·')[0].strip(), 'excerpt': meta(s, 'description'), 'keywords': '', 'readMinutes': 6, 'featured': False}),
    }
    (out / 'posts' / f'{slug}.json').write_text(json.dumps(post, ensure_ascii=False, indent=1))
    posts.append(slug)

# ISO 37001 landing (same article system)
s = (root / 'anticorrupcion-iso-37001/index.html').read_text()
lines, hmeta, sub, tags = hero(s)
page = {'heroLines': lines, 'meta': hmeta, 'lead': sub, 'tags': tags,
        'title': text(re.search(r'<title>(.*?)</title>', s).group(1)), 'description': meta(s, 'description'),
        'body': clean(inner(s, 'iso-main', 'article')), 'aside': clean(inner(s, 'iso-side', 'aside'))}
(out / 'iso-37001.json').write_text(json.dumps(page, ensure_ascii=False, indent=1))
print(len(posts), 'posts;', 'cards', len(cards))
