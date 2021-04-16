import mapboxgl from 'mapbox-gl/dist/mapbox-gl'

const ACCESS_TOKEN = 'pk.eyJ1IjoiZ2V2b3JnLW1hcnRpciIsImEiOiJja25ocWJ6emkwMDA4MnF1d20xM2J1MHV6In0.UViekLwm6Om2HQAFQ3nJ_A'
const INITIAL_LOCATION = [-73.96879951090524, 40.77796727433872]

export const render = (container) => {
  container.innerHTML = `
    <div id="map"></div>
    <div class="bar">
      <div class="info"></div>
      <button class="search">Search</button>
    </div>
  `

  const addMarker = (lng, lat, color = '#FFFFFF') => {
    return new mapboxgl.Marker({
      color,
      draggable: true
    }).setLngLat([lng, lat]).addTo(map)
  }

  const setToUI = (feature) => {
    document.querySelector('.info').innerHTML = `
      ${(feature?.address || feature.properties?.address) ? `
        <h3>Address</h3>
        <p>${feature?.address || feature.properties?.address}</p>
      ` : ''}
      <h3>Text</h3>
      <p>${feature.text}</p>
      ${feature.context?.map((field) => `
        <h3>${field.id.split('.')[0]}</h3>
        <p>${field.text}</p>
      `).toString().replaceAll(',', '')}
      <textarea>${feature.place_name}</textarea>
    `
  }

  const getAddress = async (lng, lat) => {
    return await (await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${ACCESS_TOKEN}`)).json()
  }

  const setAddress = async (lng, lat) => {
    const addressData = await getAddress(lng, lat)
    const { features } = addressData
    setToUI(features[0])
  }

  const findAddress = async (address) => {
    const addressData = await (await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${address.toLowerCase()}.json?access_token=${ACCESS_TOKEN}`)).json()
    const { features } = addressData
    map.setCenter(features[0].center);
    marker.setLngLat(features[0].center)
    setToUI(features[0])
  }

  mapboxgl.accessToken = ACCESS_TOKEN

  const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: INITIAL_LOCATION,
    zoom: 13
  })

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

  document.querySelector('.search').addEventListener('click', async () => {
    const address = document.querySelector('.info textarea').value
    findAddress(address)
  })
}
