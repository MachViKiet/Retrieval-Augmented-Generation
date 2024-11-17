/* eslint-disable no-unused-vars */
const domain = `http://${process.env.KHTNCHATBOT_HOST}:${process.env.KHTNCHATBOT_PORT}`

export const extract_meta = async (userInput, chosen_collections, api_key = null) => {
  const url = `${domain}/generate/extract_meta?query=${encodeURIComponent(userInput)}&chosen_collection=${encodeURIComponent(chosen_collections)}`

  // Thực hiện GET request
  const res = await fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      return response.json()
    }
    )
    .then(data => {
      return data
    })
    .catch(error => {
      throw new Error(error)
    })

  return res
}

