export function initSettings() {
	const checkboxes = document.querySelectorAll(".setting");

	let settings = JSON.parse(localStorage.getItem("settings")) || {};
	if (settings == {}) {
		checkboxes.forEach(cb => {
			const key = cb.dataset.key;
			if (key == "darkMode") {
				settings[key] = true;
			} else {
				settings[key] = false;
			}
		});
	}

	localStorage.setItem("settings", JSON.stringify(settings));
	checkboxes.forEach(cb => {
		const key = cb.dataset.key;
		if (key == "darkMode") {
			cb.checked = settings[key] || true;
		} else {
			cb.checked = settings[key] || false;
		}

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

