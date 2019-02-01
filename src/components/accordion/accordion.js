import { closest } from 'Helpers/dom'
import AccordionTemplate from './template'
import ModalTemplate from 'Components/modal/template'
import Services from 'Services'

/**
 * Accordion component
 *
 * @export
 * @class Accordion
 */
export default class Accordion {

  /**
   * Creates an instance of Accordion.
   *
   * @param { Object } [props={}]
   * @memberof Accordion
   */
  constructor (props = {}) {
    this.$element = document.getElementById(props.element)
    this.$body = document.getElementsByTagName('body')
    this.$accordions = document.querySelectorAll(props.accordion)
    this.$responsiveAccordions = document.querySelectorAll(props.accordion + props.modifier)

    this.onLoad = this.onLoad.bind(this)
    this.onClick = Accordion.onClick.bind(this)

    // Kicking off the component.
    this.init()
  }

  /**
   * Attaches all events to DOM elements.
   *
   * @memberof Accordion
   */
  init () {
    if (!this.$accordions) {
      return
    }


    window.addEventListener('load', this.onLoad, false)

    document.addEventListener('click', Accordion.triggerModal, false)

    this.$accordions.forEach(($accordion) => {
      $accordion.addEventListener('click', Accordion.onClick, false)
      $accordion.addEventListener('keydown', Accordion.onKeyDown, false)
      $accordion.addEventListener('click', Accordion.triggerModal, false)
    })
  }

  /**
   * Deattaches all events to DOM elements.
   *
   * @memberof Accordion
   */
  destroy () {
    if (!this.$accordions) {
      return
    }

    window.removeEventListener('load', this.onLoad, false)

    document.removeEventListener('click', Accordion.triggerModal, false)

    this.$accordions.forEach(($accordion) => {
      $accordion.removeEventListener('click', Accordion.onClick, false)
      $accordion.removeEventListener('keydown', Accordion.onKeyDown, false)
      $accordion.addEventListener('click', Accordion.triggerModal, false)
    })
  }

  /**
   * Closes an accordion by its trigger button.
   *
   * @param {any} trigger
   * @memberof Accordion
   */
  static closeAccordion ($trigger) {
    // Close the activated accordion, using aria-controls to specify the desired section.
    document.getElementById($trigger.getAttribute('aria-controls')).setAttribute('hidden', '')
    // Set the expanded state on the triggering element.
    $trigger.setAttribute('aria-expanded', 'false')

    const icon = $trigger.querySelector('.ion-md-arrow-dropdown')
    icon.classList.remove('ion-md-arrow-dropright')
    icon.classList.add('ion-md-arrow-dropright')
  }

  /**
   * Opens an accordion by its trigger button.
   *
   * @param {any} trigger
   * @memberof Accordion
   */
  static openAccordion ($trigger) {
    const $element = document.getElementById($trigger.getAttribute('aria-controls'))

    if ($element) {
      // Open the activated accordion, using aria-controls to specify the desired section.
      $element.removeAttribute('hidden')

      // Set the expanded state on the triggering element.
      $trigger.setAttribute('aria-expanded', 'true')

    }
    const icon = $trigger.querySelector('.ion-md-arrow-dropright')
    icon.classList.remove('ion-md-arrow-dropright')
    icon.classList.add('ion-md-arrow-dropdown')
  }

  /**
   * Reacts to click events on accordions.
   *
   * @param {Event} e
   * @memberof Accordion
   */
  static onClick (event) {
    let target
    if (event.target.classList.contains('accordion__trigger')) {
      target = event.target
    } else if (event.target.parentNode.classList.contains('accordion__trigger')) {
      target = event.target.parentNode
    } else {
      return
    }

    const isExpanded = target.getAttribute('aria-expanded') === 'true'

    if (isExpanded) {
      Accordion.closeAccordion(target)
    } else if (!isExpanded) {
      Accordion.openAccordion(target)
    }

    event.preventDefault()
  }

  /**
   * Reacts to keydown events on accordions to help
   * our users to focus on the right accordion after
   * pressing any key.
   *
   * It reacts to the following key press events:
   *
   * 33 = Page Up
   * 34 = Page Down
   * 35 = End
   * 36 = Home
   * 38 = Up
   * 40 = Down
   *
   * This method was extracted and tweaked a bit from
   * https://www.w3.org/TR/wai-aria-practices/examples/accordion/accordion.html
   *
   * @param {Event} e
   * @memberof Accordion
   */
  static onKeyDown (event) {
    const target = event.target
    const $accordion = closest(target, 'accordion')
    const $triggers = $accordion.querySelectorAll('.accordion__trigger')
    const $panels = $accordion.querySelectorAll('.accordion__trigger')
    const key = event.which.toString()
    // 33 = Page Up, 34 = Page Down.
    const ctrlModifier = (event.ctrlKey && key.match(/33|34/))

    // Is this coming from an accordion header?
    if (target.classList.contains('accordion__trigger')) {
      if (key.match(/38|40/) || ctrlModifier) {
        // 38 = Up, 40 = Down, ctrlModifier = Page Up/Page Down.
        const index = Array.from($triggers).indexOf(target)
        const direction = (key.match(/34|40/)) ? 1 : -1
        const length = $triggers.length
        const newIndex = (index + length + direction) % length
        $triggers[newIndex].focus()
      } else if (key === '35') {
        // 35 = End.
        $triggers[$triggers.length - 1].focus()
      } else if (key === '36') {
        // 36 = Home.
        $triggers[0].focus()
      }
    } else if (ctrlModifier) {
      // Control + Page Up/Page Down keyboard operations.
      // Catches events that happen inside of panels.
      $panels.forEach(($panel, index) => {
        if ($panel.contains(target)) {
          $triggers[index].focus()
          event.preventDefault()
        }
      })
    }
  }


  /**
   * Call the Api and render the accordion
   *
   * @returns {[ Object ]}
   * @memberof Accordion
   */
  async onLoad () {
    try {
      const GET_PAGE = 1
      const GET_PER_PAGE = 4
      const payload = await Services.get(GET_PAGE, GET_PER_PAGE)
      this.renderAccordion(payload)
      this.addClickListener()
      return payload
    } catch (e) {
      throw new Error(e)
    }
  }

  /**
   * Initialize the accordion template
   * and render the html with the data from APi
   *
   * @param {[Object]} data
   * @memberof Accordion
   */
  renderAccordion (data) {
    const accordion = new AccordionTemplate()
    this.$element.innerHTML = accordion.accordionMarkup(data)
  }


  /**
   * Open the modal and with data from the api
   *
   * @static
   * @param {Any} event
   * @memberof Accordion
   */
  static triggerModal (event) {
    const dataModal = event.target.getAttribute('data-modal')
    if ( dataModal !== null) {
      Accordion.openModal(dataModal)
    }
  }


  /**
   * Load the modal data from the api
   *
   * @static
   * @param {Int} id
   * @returns {[Object]}
   * @memberof Accordion
   */
  static async openModal (id) {
    try {
      const payload = await Services.getById(id)
      Accordion.renderModal(payload)
      return payload
    } catch (e) {
      throw new Error(e)
    }
  }


  /**
   * Initialize the modal template with the data api
   *
   * @static
   * @param {[Object]} data
   * @memberof Accordion
   */
  static renderModal (data) {
    const modal = new ModalTemplate()
    const $element = document.getElementById('modal-slot')

    $element.innerHTML = modal.modalMarkup(data)

  }

  /**
   * Adds click listener for each accordion trigger
   *
   * @memberof Accordion
   */
  addClickListener () {
    this.$elmTrigger = document.querySelectorAll('.accordion__trigger')

    this.$elmTrigger.forEach(($trigger) => {
      $trigger.addEventListener('click', Accordion.onClick, false)
    })
  }
}
