export function initThemeSwitcher() {
	const themeSwitch = document.getElementById("themeSwitchCheckbox");

	if (localStorage.getItem("theme") === "light") {
	document.body.classList.add("light");
	themeSwitch.checked = true;
	}

	themeSwitch.addEventListener("change", () => {
	if (!themeSwitch.checked) {
		document.body.classList.add("light");
		localStorage.setItem("theme", "light");
	} else {
		document.body.classList.remove("light");
		localStorage.setItem("theme", "dark");
	}
	});
}