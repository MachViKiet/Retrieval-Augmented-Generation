const domain = import.meta.env.VITE_SERVER

export const update = async (data, token = null) => {
	const url = `${domain}/`;
	console.log(url)
	const structure = {
		method: 'PATCH',
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
			const user_profile = sessionStorage.getItem('userProfile')
			sessionStorage.setItem('userProfile', JSON.stringify({ ...JSON.parse(user_profile), "name": data?.name, "role": data?.role, "email" : data?.email}))
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