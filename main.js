import './style.css'
import { render as renderMapBox } from './maps/mapbox'


const main = () => {
  renderMapBox(document.querySelector('#app'))
}

main()
