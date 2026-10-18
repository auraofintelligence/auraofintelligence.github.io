import html
import json
from pathlib import Path
import xml.etree.ElementTree as ET
from urllib.parse import urlsplit

ROOT = Path(__file__).resolve().parents[1]
ORIGIN = "https://auraofintelligence.github.io"
DATA = ROOT / "data/project-discovery.json"

def build():
    data = json.loads(DATA.read_text(encoding="utf-8"))
    projects = data["projects"]
    if any(p.get("visibility") != "public" for p in projects):
        raise ValueError("Only confirmed public repositories belong in this directory")
    if len({p["search_identifier"].casefold() for p in projects}) != len(projects):
        raise ValueError("Search identifiers are not unique")
    for project in projects:
        for key in ("website", "repository", "licence_url"):
            value = project.get(key)
            if value and (urlsplit(value).scheme != "https" or not urlsplit(value).hostname):
                raise ValueError("Invalid public URL: " + str(value))
    esc = lambda value: html.escape(str(value), quote=True)
    home = (ROOT / "index.html").read_text(encoding="utf-8")
    header = home[home.index('<header class="site-header">'):home.index("</header>") + len("</header>")]
    cards = []
    for project in projects:
        name = esc(project["name"])
        phrase = esc(project["search_identifier"])
        description = "<p>" + esc(project["description"]) + "</p>" if project["description"] else ""
        licence = ('<a href="' + esc(project["licence_url"]) + '">Licence</a>') if project["licence_url"] else ""
        topics = ", ".join(project["topics"][:4])
        topics_html = '<p class="directory-topics">' + esc(topics) + "</p>" if topics else ""
        search = esc(" ".join([project["name"], project["search_identifier"], project["description"], *project["topics"]]))
        cards.append(
            '<li class="directory-card" id="' + phrase + '" data-project data-search="' + search + '">'
            '<h2><a href="' + esc(project["website"]) + '">' + name + "</a></h2>"
            + description +
            '<div class="directory-phrase"><span>Search phrase</span><code data-phrase>' + phrase + "</code>"
            '<button type="button" data-copy aria-label="Copy search phrase for ' + name + '">Copy phrase</button></div>'
            '<p class="directory-date">Repository created <time datetime="' + esc(project["creation_date_brisbane"]) + '">' + esc(project["creation_date_brisbane"]) + "</time></p>"
            + topics_html +
            '<nav class="directory-links" aria-label="' + name + ' links"><a href="' + esc(project["website"]) + '">Website</a><a href="' + esc(project["repository"]) + '">Repository</a>' + licence + "</nav></li>"
        )
    page = """<!doctype html>
<html lang="en-AU">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Find a project | auraofintelligence</title>
<meta name="description" content="Find Aura of Intelligence, Strange But True and i C. infinity projects by name or the exact auraofintelligence-slug search phrase shared in comments.">
<meta name="theme-color" content="#0a1420">
<link rel="canonical" href="https://auraofintelligence.github.io/find.html">
<link rel="license" href="LICENCE.md">
<link rel="icon" type="image/svg+xml" href="assets/favicon.svg">
<link rel="stylesheet" href="styles.css?v=4">
<style>
.directory-intro {padding-top:3rem;padding-bottom:1.5rem}
.directory-intro h1 {font-size:clamp(2.4rem,6vw,4.6rem);line-height:1.08;margin:.6rem 0 1.2rem}
.directory-intro p {max-width:52rem}
.directory-tools {display:flex;flex-wrap:wrap;align-items:end;gap:.8rem;margin:1.5rem 0 .7rem}
.directory-tools[hidden],.directory-card[hidden],#directory-empty[hidden] {display:none}
.directory-tools label {flex:1 1 18rem;display:grid;gap:.5rem;font-weight:600}
.directory-tools input {min-width:0;width:100%;padding:.9rem 1rem;border:1px solid var(--line,#567);border-radius:.4rem;background:var(--panel,#111f2e);color:var(--text,#fff);font:inherit}
.directory-tools button,.directory-phrase button {min-height:44px;padding:.6rem .9rem;border:1px solid var(--line,#567);border-radius:.4rem;background:transparent;color:inherit;font:inherit;cursor:pointer}
.directory-tools button:hover,.directory-phrase button:hover {border-color:var(--teal,#5dd)}
.directory-tools input:focus-visible,.directory-tools button:focus-visible,.directory-phrase button:focus-visible {outline:2px solid var(--teal,#5dd);outline-offset:3px}
.directory-count,.directory-date,.directory-topics {color:var(--muted,#b8c7d5);font-size:.9rem}
.directory-list {list-style:none;display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,22rem),1fr));gap:1rem;margin:0;padding:0}
.directory-card {min-width:0;padding:1.4rem;border:1px solid var(--line,#456);border-radius:.6rem;display:flex;flex-direction:column;gap:.8rem;background:rgba(255,255,255,.025);scroll-margin-top:7rem}
.directory-card h2 {font-size:1.15rem;line-height:1.4;margin:0;overflow-wrap:anywhere}
.directory-card h2 a {text-decoration:none}
.directory-card p {margin:0;line-height:1.6}
.directory-phrase {margin-top:auto;padding:.8rem;border-radius:.4rem;background:rgba(0,0,0,.2);display:grid;gap:.6rem}
.directory-phrase span {color:var(--muted,#b8c7d5);font-size:.8rem}
.directory-phrase code {font-family:var(--font-mono,monospace);font-size:.85rem;line-height:1.65;overflow-wrap:anywhere;user-select:all}
.directory-phrase button {justify-self:start;font-size:.85rem}
.directory-links {display:flex;flex-wrap:wrap;gap:.4rem 1rem}
.directory-links a {display:inline-flex;align-items:center;min-height:44px;font-size:.9rem}
.directory-body {padding-top:1rem}
.directory-notice {color:var(--muted,#b8c7d5);max-width:65rem}
</style>
</head>
<body data-page="find">
<a class="skip-link" href="#main">Skip to content</a>
__HEADER__
<main id="main">
<section class="section directory-intro">
<p class="eyebrow">Aura of Intelligence · Strange But True · i C. infinity</p>
<h1>Find a project</h1>
<p>Use a search phrase from a comment to find its project, or explore by name and subject.</p>
<p>For example: <code>auraofintelligence-I-c-infinity-music-universe</code></p>
<div class="directory-tools" id="directory-tools" hidden>
<label for="project-search">Project name, subject or search phrase
<input id="project-search" type="search" placeholder="Paste a search phrase" autocomplete="off" spellcheck="false"></label>
<button type="button" id="directory-clear">Clear</button>
</div>
<p id="directory-count" class="directory-count" role="status">__COUNT__ project sites</p>
<p id="directory-copy-status" class="directory-count" role="status"></p>
<p class="directory-notice">Each project keeps its own licence and third-party terms. Its licence link, where available, leads to the existing repository file. These links and search phrases grant no additional reuse rights.</p>
</section>
<section class="section directory-body" aria-label="Project directory">
<p id="directory-empty" hidden>No matching project. Try a shorter name or subject.</p>
<ul class="directory-list">
__CARDS__
</ul>
</section>
</main>
<footer class="site-footer">
<div><p>Aura of Intelligence · Luke Nathan Hayes · Minjerribah</p><p><a href="LICENCE.md">Aura of Intelligence Public Source Licence</a> · <a href="sitemap.html">Site map</a></p></div>
</footer>
<script src="assets/site-nav.js" defer></script>
<script>
(() => {
  const input = document.getElementById('project-search');
  const cards = Array.from(document.querySelectorAll('[data-project]'));
  const count = document.getElementById('directory-count');
  const empty = document.getElementById('directory-empty');
  const normalise = (value) => value.toLowerCase().replace(/_/g, '-').replace(/\\s+/g, ' ').trim();
  const filter = () => {
    const query = normalise(input.value);
    let visible = 0;
    cards.forEach((card) => {
      card.hidden = query !== '' && !normalise(card.dataset.search).includes(query);
      if (!card.hidden) visible += 1;
    });
    count.textContent = visible + (visible === 1 ? ' project site' : ' project sites');
    empty.hidden = visible !== 0;
  };
  input.addEventListener('input', filter);
  document.getElementById('directory-clear').addEventListener('click', () => {
    input.value = '';
    filter();
    input.focus();
  });
  document.getElementById('directory-tools').hidden = false;
  document.querySelector('.directory-list').addEventListener('click', async (event) => {
    const button = event.target.closest('[data-copy]');
    if (!button) return;
    const code = button.closest('[data-project]').querySelector('[data-phrase]');
    const status = document.getElementById('directory-copy-status');
    try {
      await navigator.clipboard.writeText(code.textContent);
      status.textContent = 'Copied: ' + code.textContent;
    } catch {
      const range = document.createRange();
      range.selectNodeContents(code);
      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
      status.textContent = 'Phrase selected. Copy the selected text.';
    }
  });
})();
</script>
</body>
</html>
"""
    page = page.replace("__HEADER__", header).replace("__COUNT__", str(len(projects))).replace("__CARDS__", "\n".join(cards))
    (ROOT / "find.html").write_text(page, encoding="utf-8")
    namespace = "http://www.sitemaps.org/schemas/sitemap/0.9"
    ET.register_namespace("", namespace)
    sitemap = ET.Element("{" + namespace + "}urlset")
    urls = {ORIGIN + "/" + p for p in data["root_pages"] if p != "index.html"}
    urls.add(ORIGIN + "/")
    urls.update(p["website"] for p in projects if urlsplit(p["website"]).netloc == "auraofintelligence.github.io")
    for url in sorted(urls):
        node = ET.SubElement(sitemap, "{" + namespace + "}url")
        ET.SubElement(node, "{" + namespace + "}loc").text = url
    ET.indent(sitemap, space="  ")
    (ROOT / "sitemap.xml").write_bytes(ET.tostring(sitemap, encoding="utf-8", xml_declaration=True) + b"\n")
    robots_path = ROOT / "robots.txt"
    robots = robots_path.read_text(encoding="utf-8")
    robots = robots.replace("# Discovery rules for Aura Genesis Protocol and i C. infinity Music Universe.", "# Search discovery for the Aura of Intelligence project catalogue.")
    lines = robots.splitlines()
    if "# Project directory and existing licence links: " + ORIGIN + "/find.html" not in lines:
        lines[:0] = [
            "# Project directory and existing licence links: " + ORIGIN + "/find.html",
            "# Search discovery grants no additional reuse, commercial or AI-training rights.",
            "# Each project's existing licence and third-party terms continue to apply.",
            "# Only this host-root file governs crawling of the shared GitHub Pages hostname.",
            "",
        ]
    declared = {line.split(":", 1)[1].strip() for line in lines if line.lower().startswith("sitemap:")}
    for url in [ORIGIN + "/sitemap.xml", *data["project_sitemaps"]]:
        if url not in declared:
            lines.append("Sitemap: " + url)
            declared.add(url)
    robots_path.write_text("\n".join(lines).rstrip() + "\n", encoding="utf-8")
    print(json.dumps({"projects": len(projects), "sitemap_urls": len(urls), "declared_sitemaps": len(declared)}))

if __name__ == "__main__":
    build()

