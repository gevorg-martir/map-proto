import mapboxgl from 'mapbox-gl/dist/mapbox-gl'

const ACCESS_TOKEN = 'pk.eyJ1IjoiZ2V2b3JnLW1hcnRpciIsImEiOiJja25ocWJ6emkwMDA4MnF1d20xM2J1MHV6In0.UViekLwm6Om2HQAFQ3nJ_A'
const INITIAL_LOCATION = [-73.96879951090524, 40.77796727433872]

export const render = (container) => {
  container.innerHTML = `
    <div id="map"></div>
    <div class="info"><div>
  `

  mapboxgl.accessToken = ACCESS_TOKEN

  const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: INITIAL_LOCATION,
    zoom: 13
  })

  const addMarker = (lng, lat, color = '#FFFFFF') => {
    return new mapboxgl.Marker({
      color,
      draggable: true
    }).setLngLat([lng, lat]).addTo(map)
  }

  const getAddress = async (lng, lat) => {
    return await (await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${ACCESS_TOKEN}`)).json()
  }

  const setAddress = async (lng, lat) => {
    const addressData = await getAddress(lng, lat)
    const { features } = addressData
    document.querySelector('.info').innerHTML = `
      <h3>Address</h3>
      <p>${features[0]?.address || features[0].properties?.address}</p>
      <h3>Text</h3>
      <p>${features[0].text}</p>
      ${features[0].context.map((field) => `
        <h3>${field.id.split('.')[0]}</h3>
        <p>${field.text}</p>
      `).toString().replaceAll(',', '')}
      <textarea>${features[0].place_name}</textarea>
    `
  }

  const marker = addMarker(INITIAL_LOCATION[0], INITIAL_LOCATION[1])
  setAddress(INITIAL_LOCATION[0], INITIAL_LOCATION[1])

  marker.on('dragend', async (e) => {
    const lngLat = e.target.getLngLat()
    setAddress(lngLat.lng, lngLat.lat)
  })

  map.on('click', async (e) => {
    const { lngLat } = e
    marker.setLngLat(lngLat)
    setAddress(lngLat.lng, lngLat.lat)
  })
}
