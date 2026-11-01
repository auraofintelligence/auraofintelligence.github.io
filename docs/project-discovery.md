# Project discovery

The public directory at [find.html](../find.html) pairs each project with the
complete search phrase used in link-free comments. For example:

auraofintelligence-I-c-infinity-music-universe

All 163 entries are ordinary HTML links and readable text. Filtering and copy
buttons add convenience; visitors and crawlers get the full directory without
JavaScript. Case is retained for display, while filtering is case-insensitive
and treats underscores and hyphens alike.

## Updating the directory

Check current GitHub visibility before adding or refreshing an entry. Only
public repositories belong in this directory. Each entry requires an explicit
visibility value of public; the generator rejects anything else.

Edit data/project-discovery.json using current GitHub repository metadata and
the repository's actual licence file, then run:

    python3 tools/build_discovery.py

This regenerates find.html and the host-level sitemap.xml, and adds verified
project sitemap declarations to robots.txt. The generator checks URL schemes
and identifier uniqueness. It does not inspect external deployments or infer
that a project is complete.

The inventory was checked on 18 October 2026. Repository dates use
Australia/Brisbane, with GitHub's original UTC timestamps retained in the data.
A repository creation date is separate from the age of its ideas or source
material. URLs are case-sensitive: preserve actual GitHub Pages paths.

The P4A civic site uses p4a.xyz, as recorded in its CNAME. It remains linked in
the HTML directory and follows that hostname's own robots.txt. It is excluded
from the github.io sitemap to avoid listing a different hostname's URLs.

## Crawl rules and licences

The authoritative file for the shared hostname is:

https://auraofintelligence.github.io/robots.txt

A file at /some-project/robots.txt is a project reference and does not govern
crawling of this shared hostname. A custom domain has its own host-root policy.

Existing GPTBot, ClaudeBot and Google-Extended restrictions are retained. No
blanket licence replaces the individual projects' terms. Existing licence
files and third-party notices are not edited by this discovery update.
One public repository has no top-level licence file in the checked inventory;
its entry links to the repository without inventing a licence.

robots.txt supplies cooperative crawl directions. It is not an access-control
system or copyright enforcement, and its comments do not create reuse rights.
The original licences remain the source for permitted uses. Search indexing
and model-training collection are separate settings where a provider supports
that distinction.

GitHub topics allow at most 50 characters per topic and 20 topics per
repository. Fourteen complete search identifiers exceed that character limit.
Their full text remains in the public directory; it is never truncated or
changed just to fit a topic. The separate slug topic still fits.

Sitemaps and crawl access help discovery. They do not guarantee indexing,
ranking or the timing of search updates.

## Crawler merge audit: 1 November 2026

Checked the default-branch trees of all 186 public repositories available at the
time of this audit, including project-root files, built copies and scoped root
snippets. Also fetched robots.txt at every public repository's Pages path; the
live sweep found 37 files: this root, P4A's redirect to p4a.xyz, and 35 shared-host
project files. This caught Outreach CMS's deployment-generated file, which is
absent from its default-branch tree. Private repositories were excluded.
The 35 shared-host projects with
their own crawler files are now represented by their scoped rules, their sitemap
declarations, or the host's existing default crawl access for sitemap-only files.

All existing project training-crawler restrictions were already present and are
preserved. Added 24 explicit project-scoped allow entries and eight missing
sitemap declarations: 7-mile-admin-prep, RCC-RJC-Job-Ad-Formula, rough-as-guts,
JRA-Product-Engine-Plan, installing-the-missing-middle,
infinity-creative-workshop, escape-room-team-building and outreach-cms.
Each new sitemap was
fetched successfully and parsed as sitemap XML. The root file now declares 34
unique sitemaps, including its own sitemap and earlier project declarations.

P4A uses its separate p4a.xyz host-root policy. Files under the Knights Templar
repository's source-repositories directory are reference snapshots, not policies
for that site's root. Identical source/build copies were checked together.
No project licence or third-party notice was changed.

For future projects, check the actual public hosting URL and publishing source.
Merge a project's scoped root snippet into the matching user-agent groups here.
If a project has only an ordinary robots.txt, translate its local paths to the
project prefix first. Never paste an unscoped project Disallow: / into this shared
host policy. Named crawler groups do not inherit wildcard-group restrictions;
preserve each project's intended restrictions for every applicable group.
Custom domains keep their own policies.

The directory generator adds sitemap declarations but does not import crawler
groups from project repositories. Recheck this root file whenever a project
policy changes, and verify the published root after deployment.

## Primary references

- https://developers.google.com/crawling/docs/robots-txt/create-robots-txt
- https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap
- https://developers.openai.com/api/docs/bots
- https://www.rfc-editor.org/rfc/rfc9309.html
- https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/classifying-your-repository-with-topics

