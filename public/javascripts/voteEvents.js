const handleResponse = async (res) => {
	if (!res.ok) {
		throw res;
	}
	const data = await res.json()
	return data
};

const upvote = async (e) => {
	try {
		console.log('inside upvote')
		const res = await fetch(`/CocktailAs/${e.target.id}`, {
			method: "PATCH"
		});
		const data = await handleResponse(res)
		const targetArray = e.target.id.split('/');
		// console.log(targetArray)
		document.querySelector(`#vote-${targetArray[0]}`).innerHTML = data.counter;
	}
	catch (err) {
		window.location.href = '/users/login'
	}
}
const downvote = async (e) => {
	try {
		const res = await fetch(`/CocktailAs/${e.target.id}`, {
			method: "PATCH"
		});
		const data = await handleResponse(res)
		const targetArray = e.target.id.split('/');
		document.querySelector(`#vote-${targetArray[0]}`).innerHTML = data.counter;
	}
	catch (err) {
		window.location.href = '/users/login'
	}
}

const upvoteButtons = document.querySelectorAll('.upvote');
const downvoteButtons = document.querySelectorAll('.downvote')
console.log(upvoteButtons)

upvoteButtons.forEach(button => {
  button.addEventListener('click', upvote)
})

downvoteButtons.forEach(button => {
  button.addEventListener('click', downvote)
})