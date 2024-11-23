/* eslint-disable no-unused-vars */

import { buildErrObject } from '~/middlewares/utils'

const domain = `http://${process.env.KHTNCHATBOT_HOST}:${process.env.KHTNCHATBOT_PORT}`

export const determine_collection = async (userInput = null, api_key = null) => {
  const url = `${domain}/generate/determine_collection?query=${encodeURIComponent(userInput)}`

  return fetch(url)
    .then(response => {
      if (!response.ok) throw new Error('Network response was not ok')
      return response.json()
    })
    .catch(error => {
      throw buildErrObject(422, error)
    })
}

