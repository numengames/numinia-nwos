#!/usr/bin/env python3
"""
render-glossary.py — produce the HTML view from standards/S-001-glossary.md.

The Oracle's question, 2026-08-24:

    «The document says it is a generated view of standards/S-001-glossary.md.
     Does the generator exist? Because if the HTML is written by hand and the
     .md is a declaration, it is the same violation as v1 with better wording.»

It did not exist. The HTML was written by hand and kept in sync from memory —
and it had already drifted: it renumbered the sections wrongly and dropped §9
(Naming) entirely, while its own footer claimed to be generated from the .md.

This is the generator. It reads the .md, renders it with the house design
system, and cannot drift because it does not know how to invent content.

    python3 scripts/render-glossary.py                 # → build/S-001-glossary.html
    python3 scripts/render-glossary.py --check         # fail if out of date
    python3 scripts/render-glossary.py -o path.html

Note on scope: numinia.org already renders every corpus document through Astro
(`web/src/pages/corpus/[...slug].astro`), and that is the canonical published
view. This script exists for the offline case — reviewing a draft that is not
yet merged, or reading the document without a build. When both exist, Astro
wins; this is a convenience, not a second source of truth.
"""
import argparse, hashlib, html, os, re, subprocess, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SOURCE = os.path.join(ROOT, 'standards', 'S-001-glossary.md')
DEFAULT_OUT = os.path.join(ROOT, 'build', 'S-001-glossary.html')

# Design System v5.1.0 §19.3 — canonical tokens. Values are not invented here;
# they are copied from standards/2026_08_18-Sistema_de_Diseno-v5.1.0.md.
CSS = """
:root{
  --fondo-base:#14110F;--fondo-superficie:#1E1A17;--fondo-elevada:#292420;
  --linea-tenue:#241F1B;--linea-fuerte:#3A332D;
  --texto-primario:#F9EBDC;--texto-secundario:#C4B5A6;--texto-terciario:#8A7D72;
  --verdemar:#A6DAD5;--turquesa:#018EA1;--ambar:#EFA517;--coral:#F35059;--grana:#D33440;
  --sans:'Geist','Inter','Aptos','Segoe UI',Arial,sans-serif;
  --mono:'Geist Mono','Consolas','Courier New',monospace;
  --s100:4px;--s200:8px;--s300:12px;--s400:16px;--s500:24px;--s600:32px;
  --s700:48px;--s800:64px;--s900:96px;
  --r-control:6px;--r-marco:8px;--r-completo:9999px;
}
*{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth}
body{background:var(--fondo-base);color:var(--texto-primario);
  font:400 1rem/1.55 var(--sans);-webkit-font-smoothing:antialiased}
:focus-visible{outline:2px solid var(--turquesa);outline-offset:2px}
.wrap{max-width:1280px;margin:0 auto;padding:0 var(--s800)}
@media(max-width:900px){.wrap{padding:0 var(--s500)}}
nav{border-bottom:1px solid var(--linea-tenue);position:sticky;top:0;z-index:10;
  background:var(--fondo-base)}
nav .wrap{display:flex;align-items:center;gap:var(--s500);height:64px;flex-wrap:wrap}
.logo{font:600 1.05rem/1 var(--mono)}.logo i{font-style:normal;color:var(--turquesa)}
nav a{color:var(--texto-secundario);text-decoration:none;
  font:500 .75rem/1 var(--mono);letter-spacing:.10em;text-transform:uppercase}
nav a:hover{color:var(--texto-primario)}
.pill{margin-left:auto;color:var(--ambar);border:1px solid var(--linea-fuerte);
  padding:7px 14px;border-radius:var(--r-completo);
  font:500 .75rem/1 var(--mono);letter-spacing:.10em;text-transform:uppercase}
.gen{background:var(--fondo-superficie);border:1px solid var(--linea-fuerte);
  border-left:3px solid var(--turquesa);border-radius:var(--r-marco);
  padding:var(--s400) var(--s500);margin:var(--s600) 0;
  color:var(--texto-secundario);font-size:.875rem}
.gen b{color:var(--verdemar)}
.gen code{font-size:.9em}
main{padding:var(--s700) 0 var(--s900)}
h1{font-size:2.986rem;font-weight:500;letter-spacing:-.02em;line-height:1.1;
  margin:var(--s600) 0 var(--s400);max-width:24ch}
h2{font-size:2.074rem;font-weight:600;letter-spacing:-.02em;line-height:1.15;
  margin:var(--s800) 0 var(--s300);max-width:32ch;
  padding-top:var(--s500);border-top:1px solid var(--linea-tenue)}
h3{font-size:1.44rem;font-weight:600;margin:var(--s600) 0 var(--s300)}
h4{font-size:1.15rem;font-weight:600;margin:var(--s500) 0 var(--s200);
  color:var(--texto-primario)}
p{margin:var(--s300) 0;color:var(--texto-secundario);max-width:78ch}
strong{color:var(--texto-primario);font-weight:600}
em{color:var(--texto-secundario)}
ul,ol{margin:var(--s300) 0 var(--s300) var(--s500);color:var(--texto-secundario);
  max-width:78ch}
li{margin:var(--s200) 0}
a{color:var(--verdemar)}
blockquote{border-left:3px solid var(--ambar);background:var(--fondo-superficie);
  border-radius:0 var(--r-marco) var(--r-marco) 0;
  padding:var(--s400) var(--s500);margin:var(--s500) 0;max-width:82ch}
blockquote p{color:var(--texto-secundario);margin:var(--s200) 0}
blockquote strong{color:var(--ambar)}
table{border-collapse:collapse;width:100%;margin:var(--s400) 0;font-size:.875rem}
th{background:var(--fondo-elevada);color:var(--texto-secundario);text-align:left;
  font:500 .75rem/1.35 var(--mono);letter-spacing:.10em;text-transform:uppercase}
th,td{border:1px solid var(--linea-tenue);padding:var(--s300) var(--s400);
  vertical-align:top}
td{color:var(--texto-secundario)}
code{background:var(--fondo-elevada);color:var(--texto-primario);
  padding:.14em .45em;border-radius:var(--r-control);
  font:500 .875em/1 var(--mono)}
pre{background:var(--fondo-elevada);border:1px solid var(--linea-tenue);
  border-radius:var(--r-marco);padding:var(--s400) var(--s500);overflow-x:auto;
  margin:var(--s300) 0;font:500 .875rem/1.55 var(--mono);
  color:var(--texto-secundario)}
pre code{background:none;padding:0;font-size:1em}
pre .add{color:var(--verdemar)} pre .del{color:var(--grana)}
hr{border:none;border-top:1px solid var(--linea-tenue);margin:var(--s700) 0}
.mk{font:500 .7rem/1 var(--mono);letter-spacing:.08em;padding:4px 9px;
  border-radius:var(--r-control);border:1px solid;white-space:nowrap}
.mk-ci{color:var(--verdemar);border-color:var(--verdemar);
  background:rgba(166,218,213,.07)}
.mk-man{color:var(--ambar);border-color:var(--ambar);background:rgba(239,165,23,.07)}
footer{border-top:1px solid var(--linea-tenue);padding:var(--s600) 0 var(--s800);
  color:var(--texto-terciario);font-size:.875rem}
footer .wrap{display:flex;justify-content:space-between;flex-wrap:wrap;gap:var(--s300)}
.mono{font-family:var(--mono)}
"""


def frontmatter(text):
    m = re.match(r'^---\s*\n(.*?)\n---\s*\n', text, re.S)
    if not m:
        return {}, text
    fm = {}
    for line in m.group(1).split('\n'):
        mm = re.match(r'^([a-z_]+):\s*(.*)$', line)
        if mm:
            fm[mm.group(1)] = mm.group(2).strip().strip('"\'')
    return fm, text[m.end():]


def inline(s):
    """Inline markdown → HTML. Order matters: code first, so its content is
    not re-processed."""
    out, i = [], 0
    for m in re.finditer(r'`([^`]+)`', s):
        out.append(('t', s[i:m.start()]))
        out.append(('c', m.group(1)))
        i = m.end()
    out.append(('t', s[i:]))

    res = []
    for kind, chunk in out:
        if kind == 'c':
            res.append(f'<code>{html.escape(chunk)}</code>')
            continue
        c = html.escape(chunk)
        c = re.sub(r'\[([^\]]+)\]\(([^)]+)\)', r'<a href="\2">\1</a>', c)
        c = re.sub(r'\*\*([^*]+)\*\*', r'<strong>\1</strong>', c)
        c = re.sub(r'(?<!\*)\*([^*\n]+)\*(?!\*)', r'<em>\1</em>', c)
        # enforcement markers get their chip
        c = c.replace('[CI]', '<span class="mk mk-ci">CI</span>')
        c = c.replace('[MANUAL]', '<span class="mk mk-man">MANUAL</span>')
        res.append(c)
    return ''.join(res)


def slug(s):
    s = re.sub(r'<[^>]+>', '', s).lower()
    s = re.sub(r'[^a-z0-9]+', '-', s).strip('-')
    return s


def render(md):
    lines = md.split('\n')
    out, i = [], 0
    headings = []

    while i < len(lines):
        ln = lines[i]

        # fenced code
        if ln.startswith('```'):
            lang = ln[3:].strip()
            i += 1
            buf = []
            while i < len(lines) and not lines[i].startswith('```'):
                buf.append(lines[i]); i += 1
            i += 1
            body = []
            for b in buf:
                e = html.escape(b)
                if lang == 'diff' and b.startswith('+'):
                    e = f'<span class="add">{e}</span>'
                elif lang == 'diff' and b.startswith('-'):
                    e = f'<span class="del">{e}</span>'
                body.append(e)
            out.append('<pre><code>' + '\n'.join(body) + '</code></pre>')
            continue

        # headings
        m = re.match(r'^(#{1,4})\s+(.*)$', ln)
        if m:
            lvl, txt = len(m.group(1)), inline(m.group(2))
            sid = slug(m.group(2))
            if lvl == 2:
                headings.append((sid, re.sub(r'<[^>]+>', '', txt)))
            out.append(f'<h{lvl} id="{sid}">{txt}</h{lvl}>')
            i += 1
            continue

        # tables
        if ln.startswith('|') and i + 1 < len(lines) and re.match(r'^\|[\s:|-]+\|$', lines[i+1]):
            head = [c.strip() for c in ln.strip('|').split('|')]
            i += 2
            rows = []
            while i < len(lines) and lines[i].startswith('|'):
                rows.append([c.strip() for c in lines[i].strip('|').split('|')])
                i += 1
            t = ['<table><tr>'] + [f'<th>{inline(h)}</th>' for h in head] + ['</tr>']
            for r in rows:
                t.append('<tr>' + ''.join(f'<td>{inline(c)}</td>' for c in r) + '</tr>')
            t.append('</table>')
            out.append(''.join(t))
            continue

        # blockquote
        if ln.startswith('>'):
            buf = []
            while i < len(lines) and lines[i].startswith('>'):
                buf.append(lines[i].lstrip('>').strip()); i += 1
            paras = '\n'.join(buf).split('\n\n')
            out.append('<blockquote>' +
                       ''.join(f'<p>{inline(p.replace(chr(10), " "))}</p>' for p in paras if p.strip()) +
                       '</blockquote>')
            continue

        # lists
        if re.match(r'^\s*[-*]\s+', ln) or re.match(r'^\s*\d+\.\s+', ln):
            ordered = bool(re.match(r'^\s*\d+\.\s+', ln))
            tag = 'ol' if ordered else 'ul'
            items, cur = [], None
            while i < len(lines):
                mm = re.match(r'^\s*(?:[-*]|\d+\.)\s+(.*)$', lines[i])
                if mm:
                    if cur is not None:
                        items.append(cur)
                    cur = mm.group(1)
                    i += 1
                elif lines[i].startswith('  ') and lines[i].strip() and cur is not None:
                    cur += ' ' + lines[i].strip(); i += 1
                else:
                    break
            if cur is not None:
                items.append(cur)
            out.append(f'<{tag}>' + ''.join(f'<li>{inline(x)}</li>' for x in items) + f'</{tag}>')
            continue

        if ln.strip() == '---':
            out.append('<hr>'); i += 1; continue

        if not ln.strip():
            i += 1; continue

        # paragraph
        buf = []
        while i < len(lines) and lines[i].strip() and not re.match(
                r'^(#{1,4}\s|\||>|```|\s*[-*]\s|\s*\d+\.\s|---\s*$)', lines[i]):
            buf.append(lines[i]); i += 1
        if buf:
            out.append(f'<p>{inline(" ".join(buf))}</p>')

    return '\n'.join(out), headings


def build():
    md_raw = open(SOURCE, encoding='utf-8').read()
    fm, body = frontmatter(md_raw)
    body_html, headings = render(body)

    head = subprocess.run(['git', '-C', ROOT, 'rev-parse', '--short', 'HEAD'],
                          capture_output=True, text=True).stdout.strip() or '(no git)'
    digest = hashlib.sha256(md_raw.encode()).hexdigest()[:12]

    nav = ''.join(
        f'<a href="#{sid}">{html.escape(txt.split(".")[0].strip())}</a>'
        for sid, txt in headings if re.match(r'^\d+\.', txt))

    return f"""<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{html.escape(fm.get('title', 'S-001'))} · generated view</title>
<meta name="generator" content="scripts/render-glossary.py">
<meta name="source" content="standards/S-001-glossary.md@{digest}">
<style>{CSS}</style>
</head>
<body>
<nav><div class="wrap">
  <span class="logo">NW<i>OS</i></span>
  {nav}
  <span class="pill">{html.escape(fm.get('status', '?'))} · v{html.escape(fm.get('version', '?'))}</span>
</div></nav>

<main><div class="wrap">
  <div class="gen">
    <b>This page is generated.</b> Source:
    <code>standards/S-001-glossary.md</code> — sha256 <code>{digest}</code>,
    repository HEAD <code>{head}</code>. Produced by
    <code>scripts/render-glossary.py</code>. It cannot say anything the
    source does not: if the two disagree, this file is stale, and
    <code>--check</code> fails.
    <br><br>
    The canonical published view is Astro, at
    <code>/corpus/standards/s-001-glossary</code>. This one exists for reading
    a draft before it is merged.
  </div>
{body_html}
</div></main>

<footer><div class="wrap">
  <span>Generated view of <code>standards/S-001-glossary.md</code> ·
  {html.escape(fm.get('author', '?'))}</span>
  <span class="mono">Design System v5.1.0 · Nocturno · Umbral · HEAD {head}</span>
</div></footer>
</body>
</html>
"""


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('-o', '--output', default=DEFAULT_OUT)
    ap.add_argument('--check', action='store_true',
                    help='exit 1 if the output is missing or stale')
    a = ap.parse_args()

    out = build()

    if a.check:
        if not os.path.exists(a.output):
            print(f'✗ {a.output} does not exist. Run without --check.')
            return 1
        if open(a.output, encoding='utf-8').read() != out:
            print(f'✗ {a.output} is stale: the .md changed and the view did not.')
            return 1
        print(f'✓ {os.path.relpath(a.output, ROOT)} is up to date with the source.')
        return 0

    os.makedirs(os.path.dirname(a.output), exist_ok=True)
    open(a.output, 'w', encoding='utf-8').write(out)
    md = open(SOURCE, encoding='utf-8').read()
    print(f'✓ {os.path.relpath(a.output, ROOT)}')
    print(f'  source : standards/S-001-glossary.md ({len(md):,} chars)')
    print(f'  output : {len(out):,} chars')
    print(f'  sections rendered: {len(re.findall(r"<h2 ", out))}')
    return 0


if __name__ == '__main__':
    sys.exit(main())
