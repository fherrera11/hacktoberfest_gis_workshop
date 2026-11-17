// Run from a local HTTP server. The only library is the ArcGIS SDK.
require([
  "esri/Map",
  "esri/views/MapView",
  "esri/layers/CSVLayer",
  "esri/Graphic"
], function (Map, MapView, CSVLayer, Graphic) {
  // Map setup: the map holds layers; the view draws them.
  const map = new Map({ basemap: "topo" });
  const view = new MapView({
    container: "viewDiv",
    map: map,
    center: [-120.425, 37.364], // [longitude, latitude]
    zoom: 16
  });

  // TODO 2: Add the tutorial's CSVLayer block here.

  // TODO 3: Add the green tree renderer here.

  // TODO 4: Add the attributes-and-photo popup template here.

  // TODO 5: Add your own campus point with a descriptive popup here.
});
