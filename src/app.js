// Components imports:
import Accordion from 'Components/accordion/accordion'
import Modal from 'Components/modal/modal'


// Components
// ********************************************************
const app = new Accordion({
  element: 'accordion--js',
  accordion: '.accordion--js',
  modifier: '.accordion--responsive'
})

const modal = new Modal()

export { app, modal }

