const domain = import.meta.env.VITE_SERVER


function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
  }


export const login = async (data, api_key = null) => {
	const url = `${domain}/login`;
	console.log(data)
	const structure = {
		method: 'POST',
		headers: {
		  'Content-Type': 'application/json'
		},
		body: JSON.stringify(data)
	  }

	const res = await fetch(url, structure)
		.then(async (response) => {
			// await sleep(5000)
			console.log('coss')
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
			if(typeof(err) == "object"){
				throw 'ERR_CONNECTION_REFUSED'
			}
			throw err
		}) 

	return res
}