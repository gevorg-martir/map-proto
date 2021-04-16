import './style.css'
import { render as renderMapBox } from './maps/mapbox'
import { render as renderHere } from './maps/here'


const main = () => {
  renderMapBox(document.querySelector('#app'))
  // renderHere(document.querySelector('#app'))
}

main()
