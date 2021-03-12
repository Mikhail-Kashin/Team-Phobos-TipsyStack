/* Checking if the fetch request returns ok and handling the json. */
const handleResponse = async (res) => {
	if (!res.ok) {
		throw res;
	};
	const data = await res.json();
	return data;
};

/* Callback functions for the voting click events. */
const upvote = async (e) => {
	try {
		const res = await fetch(`/CocktailAs/${e.target.id}`, {
			method: "PATCH"
		});
		const data = await handleResponse(res);
		const targetArray = e.target.id.split('/');
		document.querySelector(`#vote-${targetArray[0]}`).innerHTML = data.counter;
	} catch (err) {
		window.location.href = '/users/login';
	};
};
const downvote = async (e) => {
	try {
		const res = await fetch(`/CocktailAs/${e.target.id}`, {
			method: "PATCH"
		});
		const data = await handleResponse(res);
		const targetArray = e.target.id.split('/');
		document.querySelector(`#vote-${targetArray[0]}`).innerHTML = data.counter;
	} catch (err) {
		window.location.href = '/users/login';
	};
};

/* Grabbing all of the upvote and downvote icons on the page */
const upvoteButtons = document.querySelectorAll('.upvote');
const downvoteButtons = document.querySelectorAll('.downvote');

/* Adding event listeners to all of the upvote and downvote icons. */
upvoteButtons.forEach(button => {
  button.addEventListener('click', upvote);
});
downvoteButtons.forEach(button => {
  button.addEventListener('click', downvote);
});