/* eslint-disable no-unused-vars */
const domain = `http://${process.env.KHTNCHATBOT_HOST}:${process.env.KHTNCHATBOT_PORT}`

export const generate = async (userInput, context, streaming = 'False', api_key = null) => {
  const url = `${domain}/generate?query=${encodeURIComponent(userInput)}&context=${encodeURIComponent(context)}&streaming=${encodeURIComponent(streaming)}`

  // Thực hiện GET request
  const res = await fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      return response
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

