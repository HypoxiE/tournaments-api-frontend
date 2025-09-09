
import { initThemeSwitcher } from './theme.js';
import { initSettings } from './board_settings.js';
import { getResults } from './api.js'
import { drawTable, cutResults } from './render.js';
import { newError } from './funcs.js';

initSettings();
initThemeSwitcher();

async function main() {
	let tournament;
	try {
		tournament = await getResults();
	} catch (err) {
		if (err.message == "Failed to fetch") {
			newError("Не удалось связаться с сервером. Попробуйте позже.");
		} else {
			newError(err.message);
		}
		return
	}

	console.log(tournament)

	let readyTournamentData = tournament;
	if (!JSON.parse(localStorage.getItem("settings"))['showRepeats']) {
		readyTournamentData = await cutResults(readyTournamentData);
	}
	await drawTable(readyTournamentData);
}

main()

const showRepeatsCheckbox = document.getElementById("showRepeatsCheckbox");
showRepeatsCheckbox.addEventListener("change", () => {
	main()
});