const key = import.meta.env.VITE_CHATGPT_KEY

export const usageCompletion = async (start_time = 1736945264, limit = 31) => {
	const url = `https://api.openai.com/v1/organization/usage/completions?start_time=${start_time}&limit=${limit}`;
	const structure = {
		method: 'GET',
		headers: {
		    'Content-Type': 'application/json',
            'Authorization': `Bearer ${key}`
		}
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
			console.error('Lấy thông tin collections thất bại ! ', err)
			if(typeof(err) == "object"){
				throw 'ERR_CONNECTION_REFUSED'
			}
			throw err
		}) 

	return res
}

export default usageCompletion