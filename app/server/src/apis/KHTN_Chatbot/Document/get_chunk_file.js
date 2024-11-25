/* eslint-disable no-unused-vars */

import { buildErrObject } from '~/middlewares/utils'

const domain = `http://${process.env.KHTNCHATBOT_HOST}:${process.env.KHTNCHATBOT_PORT}`

export const get_chunk_file = async (document_id = '', collection_name = '' ) => {
  const url = `${domain}/get_file?document_id=${encodeURIComponent(document_id)}&collection_name=${encodeURIComponent(collection_name)}`
  const structure = {
    method: 'GET'
  }
  // Thực hiện GET request
  return fetch(url, structure)
    .then(response => {
      if (!response.ok) throw new Error('Network response was not ok')
      return response.json()
    })
    .catch(error => {
      throw buildErrObject(422, error)
    })
}

