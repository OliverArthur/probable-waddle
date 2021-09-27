import axios  from 'axios'
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
      const response = await axios.get(`${config.base_uri}beers?page=${page}&per_page=${perPage}`)
      return response.data
    } catch (e) {
      console.log(e)
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
      const response = await axios.get(`${config.base_uri}beers/${id}`)
      return response.data
    } catch (e) {
      console.log(e)
    }
  }
}
