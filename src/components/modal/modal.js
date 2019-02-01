export default class Modal {

  /**
   * Creates an instance of Modal.
   * @memberof Modal
   */
  constructor () {
    // Kicking off the component.
    this.init()
  }
  /**
   * Attaches all events to DOM elements.
   *
   * @memberof Modal
   */
  init () {
    document.addEventListener('click', Modal.closeModal, false)
  }
  /**
   * Deattaches all events to DOM elements.
   *
   * @memberof Modal
   */
  destroy () {
    document.removeEventListener('click', Modal.closeModal, false)
  }


  /**
   * Remove the modal from the dom
   *
   * @static
   * @memberof Modal
   */
  static closeModal () {
    const $button = document.querySelector('.modal-close')
    const $parentModal = document.getElementById('modal')
    const $childModal = document.querySelector('.modal-backdrop')

    if ($button) {
      $parentModal.parentNode.removeChild($childModal)
    }
  }
}
