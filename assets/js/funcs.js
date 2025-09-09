export function newError(error_message) {
	const container = document.getElementById("leaderboard");
	container.innerHTML = "";

	const error = document.createElement("div");
	error.className = "error-block";
	error.innerHTML = "Ошибка: " + error_message;

	container.appendChild(error);
}