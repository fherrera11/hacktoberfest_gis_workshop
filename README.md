# GIS Workshops · UC Merced

A static workshop website built with vanilla HTML, CSS, and JavaScript. No framework, build system, npm install, or API key is required for the supplied maps.

## Run locally

From this repository's root, run one of:

```powershell
py -m http.server 8000
```

```sh
python3 -m http.server 8000
```

Open http://localhost:8000/ for the landing page. Stop the server with Ctrl+C.
An editor's static HTTP server also works. Do not use file:// for the CSV map.

## Pages

- `index.html` — workshop landing page
- `workshops/index.html` — workshop listing
- `workshops/hactoberfest/index.html` — 45-minute guided workshop
- `workshops/hactoberfest/tutorials/tree_map/index.html` — numbered tutorial
- `workshops/hactoberfest/tutorials/tree_map/starter/index.html` — editable basemap starter
- `workshops/hactoberfest/tutorials/tree_map/completed/index.html` — completed map / same-host fallback

Preserve the existing `hactoberfest` spelling in URLs.

## Student files and download

Edit `workshops/hactoberfest/tutorials/tree_map/starter/app.js`. Replace its TODO 2–5 comments with the tutorial snippets, inside the require callback. Map setup is already implemented; the completed file has no unfinished TODOs. The required exercise is a campus point with a descriptive popup. The completed example is in the adjacent `completed/` directory.

`workshops/hactoberfest/tutorials/tree_map/downloads/campus-tree-map-starter.zip` includes the static site, dataset, and both examples. Extract it, enter `campus-tree-map`, start the HTTP server, and open the starter path above. The ZIP is a snapshot: regenerate it after site or tutorial edits by zipping the HTML/CSS/JS/SVG/PNG/WebP/CSV/schema/metadata files and this README under `campus-tree-map/`; exclude `.git`, the downloads folder itself, and temporary QA files. No build process is needed to serve the website.

Repository URL, derived from the existing origin remote: https://github.com/herreraflavio/giscenter.ucmercedhub.com

## Minimal runnable examples

Each example has only `index.html` (caption, sizing CSS, SDK, map container) and `app.js`. It has no shared site CSS/JS, navigation, toolbar, theme controls, cards, or footer. The website and guide retain their existing design and navigation. Both map pages use the exact target-map caption; the starter initially shows only the basemap, and students add trees, photo popups, and their campus point in TODO 2–5.

To reuse a map, copy its two files and keep the CSV at `../datasets/tree_locations.csv` relative to the HTML page, or update that one URL when moving the dataset. The examples use the SDK's light UI independently of the workshop theme. Keep the SDK's built-in navigation and attribution visible.

Tree popups use `botanical` for the title, `tree_id`, `location`, `area`, and `num_of_tru` for attributes, and the actual **`photolink`** field for the image. Of the 2,131 records, 2,106 have HTTPS image URLs and 25 have whitespace-only values. The custom popup content trims the value, accepts HTTP/HTTPS URLs, gives the image alt text, and limits it to the popup width and 240px height. Blank/invalid URLs and image-load errors show **Tree photo unavailable.** alongside the attributes. Photos remain external; internet access to the image host is required.

The numbered guide contains the exact map setup, CSV, symbol, photo popup, and campus-point blocks used by the examples. Paste each student addition at its matching TODO, inside the existing `require` callback. Setup commands and troubleshooting stay in the guide, rather than in the reusable map files.

## SDK, data, and access

The examples intentionally pin **ArcGIS Maps SDK for JavaScript 4.34**, using the CDN's readable `require` syntax. Current Esri documentation may show newer component APIs; do not mix those snippets into this pinned example without adapting them. SDK and stylesheet: https://js.arcgis.com/4.34/ and https://js.arcgis.com/4.34/esri/themes/light/main.css.

The supplied map uses `topo`; the optional code exercise changes it to `satellite`. These basemaps use public raster map services:

- https://services.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer
- https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer

The supplied map uses no account, token, or API key. Internet access to js.arcgis.com, services.arcgisonline.com, and the CSV’s photo hosts is required. Other basemap styles, private layers, or secured services may require an ArcGIS account, API key, or OAuth and suitable privileges. Leave the Esri attribution control and data-provider credit visible. Map availability remains dependent on external services and the network.

`tree_locations.csv` has **2,131 records** with real fields `Latitude`, `Longitude`, `botanical`, `tree_id`, `location`, `area`, and `num_of_tru` used in the tutorial. All rows have coordinates. The XML lineage confirms that the exported Latitude/Longitude values were calculated in WGS 84 (EPSG:4326), decimal degrees; the State Plane EPSG:2227 entry describes source geometry. No coordinates are invented for tree records. The blue campus point is explicitly an approximate teaching example. No status-code interpretation is assumed. The dataset is the user-supplied workshop snapshot; no independent data license or live-inventory claim is added.

## Hosting

Serve this repository as a static directory using your existing host. All internal paths are relative and work under a subdirectory as well as a domain root. The completed example becomes the hosted fallback when these files are deployed. This change does not publish, push, or configure DNS; no separate remote fallback is claimed to have been deployed.

## Sources and credits

Workshop presenter: Flavio Herrera, GIS Center, UC Merced. Contact and location verified against https://library.ucmerced.edu/giscontacts : giscenter@ucmerced.edu, Kolligian Library KL 330.

The workshop agenda follows the supplied `workshop_proposal.pdf`. The SSI project title and exploratory description are supplied by the presenter; no unverified outcomes or software compatibility claims are made. Images and tree data are supplied in the existing repository. The visual reference is https://ucmercedhub.com .

Official learning resources are linked beside the relevant website content, including the GIS Center and LibGuide, ArcGIS Pro access (optional), ArcGIS SDK and CSVLayer sample, Esri's deep learning toolset, and the original 3D Gaussian splatting research. This is a community workshop site on UCM Hub; the footer points to official Library resources and does not imply official university hosting.
