const domain = import.meta.env.VITE_SERVER

export const getHistory = async (data = null ,token = null) => {
	const url = `${domain}/historyInChatSession`;
	console.log(url)
	const structure = {
		method: 'POST',
		headers: {
		    'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
		},
        body: JSON.stringify(data)
	  }

	const res = await fetch(url, structure)
		.then(async (response) => {
			if (!response.ok) {
				return response.json().then(errorData => {
					throw errorData.errors.msg;
				});
			}
			return response.json()
		})
		.then(data => {
			return data
		})
		.catch((err) => {
			console.log(err)
			if(typeof(err) == "object"){
				throw 'ERR_CONNECTION_REFUSED'
			}
			throw err
		}) 

	return res
}