
const API_KEY = 'kFG4EFKe4qgJSIeKo2Do'

export const render = (container) => {
  container.innerHTML = `
    <div id="map"></div>
    <div class="info"><div>
  `

  const platform = new H.service.Platform({
    'apikey': API_KEY
  });

  const defaultLayers = platform.createDefaultLayers();

  const map = new H.Map(document.getElementById('map'), defaultLayers.vector.normal.map);
}
