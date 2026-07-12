"""Batch-update HTML pages to new Karma Credit layout."""
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent

HEADER_FALLBACK = '''<div id="site-header"></div>'''
FOOTER_FALLBACK = '''<div id="site-footer"></div>
  <script src="{js}layout.js"></script>'''

REPLACEMENTS = [
    ("Credit Karma India", "Karma Credit"),
    ("creditkarma.com", "creditkarma.in"),
    ("By Credit Karma India", "By Karma Credit"),
    ("ck-header", "site-header"),
    ("ck-footer", "site-footer"),
    ("js/main.js", "js/layout.js"),
]

def strip_old_chrome(html: str) -> str:
    html = re.sub(r'<header class="site-header">.*?</header>\s*', '', html, flags=re.S)
    html = re.sub(r'<header class="ck-header">.*?</header>\s*', '', html, flags=re.S)
    html = re.sub(r'<footer class="site-footer">.*?</footer>\s*', '', html, flags=re.S)
    html = re.sub(r'<footer class="ck-footer">.*?</footer>\s*', '', html, flags=re.S)
    html = re.sub(r'<div id="ck-header"></div>\s*', '', html)
    html = re.sub(r'<div id="ck-footer"></div>\s*', '', html)
    html = re.sub(r'<div id="site-header"></div>\s*', '', html)
    html = re.sub(r'<div id="site-footer"></div>\s*', '', html)
    html = re.sub(r'<script src="[^"]*main\.js"></script>\s*', '', html)
    html = re.sub(r'<script src="[^"]*layout\.js"></script>\s*', '', html)
    return html

def add_body_attrs(html: str, root: str, page: str) -> str:
    if 'data-root=' in html:
        html = re.sub(r'<body[^>]*>', f'<body data-root="{root}" data-page="{page}">', html)
    else:
        html = html.replace('<body>', f'<body data-root="{root}" data-page="{page}">')
    return html

def process_file(path: Path, root: str, page: str, js_prefix: str):
    html = path.read_text(encoding='utf-8')
    html = strip_old_chrome(html)
    for old, new in REPLACEMENTS:
        html = html.replace(old, new)
    html = add_body_attrs(html, root, page)
    if '<div id="site-header">' not in html:
        html = re.sub(r'(<body[^>]*>)', r'\1\n  ' + HEADER_FALLBACK, html, count=1)
    if '<div id="site-footer">' not in html:
        html = re.sub(r'(</body>)', '  ' + FOOTER_FALLBACK.format(js=js_prefix) + r'\n\1', html, count=1)
    path.write_text(html, encoding='utf-8')
    print('Updated', path.relative_to(ROOT))

# Root pages
for name, page in [
    ('about.html', 'about'),
    ('contact.html', 'contact'),
    ('privacy-policy.html', 'privacy'),
    ('disclaimer.html', 'disclaimer'),
]:
    p = ROOT / name
    if p.exists():
        process_file(p, '', page, '')

# Blog index
process_file(ROOT / 'blog' / 'index.html', '../', 'blog', '../')

# Blog articles
for p in (ROOT / 'blog').glob('*.html'):
    if p.name == 'index.html':
        continue
    process_file(p, '../', 'blog', '../')

print('Done.')
