export default class Modal {

  /**
   * Creates an instance of Modal.
   * @memberof Modal
   */
  constructor () {

    this.init()
  }

  init () {
    document.addEventListener('click', Modal.closeModal, false)
  }

  destroy () {
    document.removeEventListener('click', Modal.closeModal, false)
  }

  static closeModal () {
    const $button = document.querySelector('.modal-close')
    const $parentModal = document.getElementById('modal')
    const $childModal = document.querySelector('.modal-backdrop')

    if ($button) {
      $parentModal.parentNode.removeChild($childModal)
    }
  }
}
