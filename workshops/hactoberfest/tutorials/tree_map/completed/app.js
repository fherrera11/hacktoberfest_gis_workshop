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

  // Load the CSV using its actual coordinate field names.
  const trees = new CSVLayer({
    url: "../datasets/tree_locations.csv",
    latitudeField: "Latitude",
    longitudeField: "Longitude",
    title: "UC Merced trees"
  });
  map.add(trees);

  // Draw each tree as a green circle with a white outline.
  trees.renderer = {
    type: "simple",
    symbol: {
      type: "simple-marker",
      color: "#278256",
      size: 7,
      outline: { color: "#ffffff", width: 0.7 }
    }
  };

  // Show tree attributes and the image URL stored in photolink.
  trees.popupTemplate = {
    title: "{botanical}",
    outFields: ["*"],
    content: [
      {
        type: "fields",
        fieldInfos: [
          { fieldName: "tree_id", label: "Tree ID" },
          { fieldName: "location", label: "Campus location" },
          { fieldName: "area", label: "Area / planting context" },
          { fieldName: "num_of_tru", label: "Number of trunks" }
        ]
      },
      {
        type: "custom",
        outFields: ["photolink", "botanical", "tree_id"],
        creator: function (event) {
          const attributes = event.graphic.attributes;
          const url = String(attributes.photolink || "").trim();
          const unavailable = document.createElement("p");
          unavailable.textContent = "Tree photo unavailable.";

          // Blank or non-HTTP URLs get a readable fallback.
          if (!/^https?:\/\//i.test(url)) return unavailable;

          const image = document.createElement("img");
          image.className = "tree-photo";
          image.alt = `Tree ${attributes.tree_id}: ${attributes.botanical}`;
          image.addEventListener("error", function () {
            image.replaceWith(unavailable);
          });
          image.src = url;
          return image;
        }
      }
    ]
  };

  // Add an example campus point. Replace it with your own place.
  const campusPoint = new Graphic({
    geometry: {
      type: "point",
      longitude: -120.4241,
      latitude: 37.3653
    },
    symbol: {
      type: "simple-marker",
      style: "diamond",
      color: "#245bd6",
      size: 16,
      outline: { color: "white", width: 2 }
    },
    popupTemplate: {
      title: "My campus meeting spot",
      content: "An example meeting point near the campus core. " +
        "Replace this with your place and explain why someone should visit."
    }
  });
  view.graphics.add(campusPoint);
});
