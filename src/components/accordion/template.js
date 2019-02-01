export default class AccordionTemplate {

  /**
   * Creates an instance of AccordionTemplate.
   * @memberof AccordionTemplate
   */
  constructor() {
    this.renderRows = this.renderRows.bind(this);
    this.renderRow = this.renderRow.bind(this);
  }


  /**
   * Render the accordion dl html
   *
   * @param {[ Object ]} data
   * @returns { String }
   * @memberof AccordionTemplate
   */
  accordionMarkup(data) {
    const accordioItems = this.renderRows(data);
    return `<strong>Accordion js version</strong>
      <dl class="accordion accordion--js accordion--responsive" role="presentation">
        ${accordioItems}
      </dl>`;
  }

  /**
   * Map reduce of the accordion options into a html dl entries
   *
   * @param {[ Object ]} data
   * @returns String
   * @memberof AccordionTemplate
   */
  renderRows(data = []) {
    return data
      .map(item => this.renderRow(item))
      .reduce((html, row) => html + row, "");
  }


  /**
   * Render a html dt tags base on a data payload
   *
   * @param { Object } data
   * @returns { String }
   * @memberof AccordionTemplate
   */
  renderRow(data) {
    if (!data) return null;

    const id = data.id;
    const name = data.name;
    const description = data.description;

    return `<dt class="accordion__heading" role="heading" aria-level="2">
        <h2>
          <button class="btn btn--plain accordion__trigger" id="heading-${id}" aria-controls="panel-${id}" aria-expanded="false">
            <span class="accordion__title">
              <i class="ion ion-md-arrow-dropright"></i>${name}
            </span>
          </button>
        </h2>
      </dt>
      <dd class="accordion__panel" id="panel-${id}" aria-labelledby="heading-${id}" role="region" hidden>
        <div class="accordion__content">
          <p>${description}</p>
          <p><button type="button" data-modal="${id}" class="btn btn--plain view-more">Ver más</button></p>
        </div>
      </dd>`;
  }
}
