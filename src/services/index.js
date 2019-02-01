import config from 'Config'

export default class Services {

  /**
   * Get all the data from the punkapi api
   *
   * @static
   * @param {Int} page
   * @param {Int} perPage
   * @returns {[ Object ]}
   * @memberof Services
   */
  static async get (page, perPage) {
    try {
      const response = await fetch(`${config.base_uri}/beers?page=${page}&per_page=${perPage}`)
      const body = await response.json()
      return body
    } catch (e) {
      throw new Error(e)
    }
  }

  /**
   * Get data by id from the punkapi api
   *
   * @static
   * @param {Int} id
   * @returns {Object}
   * @memberof Services
   */
  static async getById (id) {
    try {
      const response = await fetch(`${config.base_uri}/beers/${id}`)
      const body = await response.json()
      return body
    } catch (e) {
      throw new Error(e)
    }
  }
}
