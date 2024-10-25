const domain = import.meta.env.VITE_KHTNCHATBOT_SERVICE

export const determine_collection = async (userInput = null, api_key = null) => {
	const url = `${domain}/generate/determine_collection?query=${encodeURIComponent(userInput)}`;
	console.log(url)
	// Thực hiện GET request
	const res = await fetch(url)
		.then(response => {
			if (!response.ok) {
				throw new Error('Network response was not ok');
			}
			return response.json();
			}
		)
		.then(data => {
			console.log('Dữ liệu nhận được:', data);
			return data
		})
		.catch(error => {
			throw new Error(error);
		});

	return res
}
  
  