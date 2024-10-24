document.addEventListener("DOMContentLoaded", function () {
    const themeStylesheet = document.getElementById("themeStylesheet");
    const themeToggleBtn = document.getElementById("themeToggleBtn");
    const lightIcon = document.getElementById("lightIcon");
    const darkIcon = document.getElementById("darkIcon");

    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
        if (savedTheme === "dark") {
            themeStylesheet.href = "dark-theme.css";
            lightIcon.classList.add("hidden");
            darkIcon.classList.remove("hidden");
        } else {
            themeStylesheet.href = "light-theme.css";
            darkIcon.classList.add("hidden");
            lightIcon.classList.remove("hidden");
        }
    }

    themeToggleBtn.addEventListener("click", function () {
        if (themeStylesheet.href.includes("light-theme.css")) {
            
            themeStylesheet.href = "dark-theme.css";
            lightIcon.classList.add("hidden");
            darkIcon.classList.remove("hidden");
            localStorage.setItem("theme", "dark");
        } else {
            
            themeStylesheet.href = "light-theme.css";
            darkIcon.classList.add("hidden");
            lightIcon.classList.remove("hidden");
            localStorage.setItem("theme", "light");
        }
    });
});
