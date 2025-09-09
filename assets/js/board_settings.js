export function initSettings() {

	let settings = JSON.parse(localStorage.getItem("settings")) || {};
	const checkboxes = document.querySelectorAll(".setting");
	checkboxes.forEach(cb => {
		const key = cb.dataset.key;
		cb.checked = settings[key] || false;

		cb.addEventListener("change", () => {
			settings[key] = cb.checked;
			localStorage.setItem("settings", JSON.stringify(settings));
		});
	});

	const btn = document.getElementById("settingsBtn");
	const panel = document.getElementById("settingsPanel");
	btn.addEventListener("click", () => {
		panel.classList.toggle("open");
	});
}

