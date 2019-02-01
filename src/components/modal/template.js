export default class ModalTemplate {


  /**
   * Creates an instance of ModalTemplate.
   * @memberof ModalTemplate
   */
  constructor () {
    this.modalMarkup = this.modalMarkup.bind(this)
    this.renderLists = this.renderLists.bind(this);
    this.renderList = this.renderList.bind(this);
  }
  /**
   * Render the modal
   *
   * @param {[ Object ]} data
   * @returns { String }
   * @memberof ModalTemplate
   */
  modalMarkup (data) {
    const listItem = this.renderLists(data)

    return `<div class="modal-backdrop" id="modal">
      <div class="modal" role="dialog" aria-labelledby="heading" aria-describedby="description" aria-model="true">
        <header class="modal__header">
          <h2 class="modal__header--title" id="heading">
            ${data[0].name}
          </h2>
          <button class="btn btn--plain modal-close" aria-label="Close modal"><i class="ion ion-md-close"></i></button>
        </header>
        <div class="modal__body" id="description">
          <div class="content">
            <div class="row">
              <div class="column col-6">
                <h3>${data[0].tagline}</h3>
                <p>${data[0].brewers_tips}</p>
              </div>
              <div class="column col-6">
                <figure class="modal__image">
                  <img src="${data[0].image_url}"></img>
                </figure>
              </div>
            </div>
            <div class="row">
              <div class="column">
                <strong>Ingredients</strong>
                <ul class="modal__list">
                  ${listItem}
                </ul>
              </div>
              <div class="column"></div>
            </div>
          </div>
        </div>
        <footer class="modal__footer"></footer>
      </div>
    </div>`
  }
  /**
   * Map reduce of the list item html
   *
   * @param {[ Object ]} data
   * @returns String
   * @memberof ModalTemplate
   */
  renderLists(data = []) {
    return data
      .map(item => this.renderList(item))
      .reduce((html, row) => html + row, "");
  }

  /**
   * render the list item
   *
   * @param {[ Object ]} data
   * @returns String
   * @memberof ModalTemplate
   */
  renderList(data) {
    if (!data) return null
    const content = data.ingredients.hops
    const info = content.map(item => item)
    return `<li class="modal__list--item">${info[0].name}</li>
    <li class="modal__list--item">${info[1].name}</li>
    <li class="modal__list--item">${info[2].name}</li>`
  }
}
