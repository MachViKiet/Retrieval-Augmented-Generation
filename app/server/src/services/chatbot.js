/* eslint-disable no-unused-vars */

import { buildErrObject } from '../middlewares/utils'

const domain = `http://${process.env.KHTNCHATBOT_HOST}:${process.env.KHTNCHATBOT_PORT}`

export const chatbotService = async (http_method = 'GET', params = '', get_value = [], post_value = {}, api_key = null) => {
  const query = get_value.reduce((accumulator, currentValue) => `${accumulator}&${currentValue[0]}=${currentValue[1]}`, 'index=0')

  const formData = new FormData()
  Object.entries(post_value).map((data) => {
    formData.append(data[0], data[1])
  })

  const url = `${domain}/${params}?${query}`

  let structure = {
    method: http_method
  }

  if (http_method != 'GET') { structure = { ...structure, body: formData } }

  return fetch(url, structure)
    .then(response => {
      if (!response.ok) throw new Error('Network response was not ok')
      return response.json()
    })
    .catch(error => {
      throw buildErrObject(422, error)
    })
}

