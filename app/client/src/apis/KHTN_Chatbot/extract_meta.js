const domain = import.meta.env.VITE_KHTNCHATBOT_SERVICE

export const extract_meta = async (userInput, chosen_collections, api_key = null) => {
	const url = `${domain}/generate/extract_meta?query=${encodeURIComponent(userInput)}&chosen_collection=${encodeURIComponent(chosen_collections)}`;
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
  
  