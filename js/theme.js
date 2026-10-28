(function () {
    const themeToggle = document.getElementById("themeToggle");
    if (!themeToggle) return;

    let isDark = false;
    try {
        isDark = localStorage.getItem("devconnect.theme") === "dark";
    } catch (error) {
        console.warn("Theme preference is unavailable in this browser.", error);
    }

    function applyTheme() {
        document.body.classList.toggle("dark-mode", isDark);
        themeToggle.textContent = isDark ? "☀" : "☾";
        themeToggle.setAttribute("aria-label", isDark ? "Switch to light theme" : "Switch to dark theme");
        themeToggle.setAttribute("aria-pressed", String(isDark));
    }

    applyTheme();
    themeToggle.addEventListener("click", function () {
        isDark = !isDark;
        applyTheme();
        try {
            localStorage.setItem("devconnect.theme", isDark ? "dark" : "light");
        } catch (error) {
            console.warn("Could not save theme preference.", error);
        }
    });
}());
