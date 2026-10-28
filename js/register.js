(function () {
    const modal = document.getElementById("registerModal");
    if (!modal) return;

    const form = document.getElementById("registerForm");
    const message = document.getElementById("registerMessage");
    const closeButton = modal.querySelector(".close");
    const openButtons = [document.getElementById("joinBtn"), document.getElementById("joinBannerBtn")].filter(Boolean);

    function openModal() {
        modal.classList.add("is-open");
        modal.setAttribute("aria-hidden", "false");
        document.body.classList.add("modal-open");
        document.getElementById("name").focus();
    }

    function closeModal() {
        modal.classList.remove("is-open");
        modal.setAttribute("aria-hidden", "true");
        document.body.classList.remove("modal-open");
    }

    openButtons.forEach(function (button) {
        button.addEventListener("click", openModal);
    });
    closeButton.addEventListener("click", closeModal);
    modal.addEventListener("click", function (event) {
        if (event.target === modal) closeModal();
    });
    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape" && modal.classList.contains("is-open")) closeModal();
    });
    if (window.location.hash === "#join") openModal();

    form.addEventListener("submit", function (event) {
        event.preventDefault();
        message.textContent = "";
        const formData = new FormData(form);
        const developer = {
            id: "member-" + Date.now().toString(36),
            name: String(formData.get("name")).trim(),
            email: String(formData.get("email")).trim(),
            role: String(formData.get("role")).trim(),
            skills: String(formData.get("skills")).split(",").map(function (skill) {
                return skill.trim();
            }).filter(Boolean),
            github: String(formData.get("github")).trim(),
            linkedin: String(formData.get("linkedin")).trim(),
            about: String(formData.get("about")).trim(),
            image: "",
            location: "Community member"
        };
        if (!developer.skills.length) {
            message.textContent = "Add at least one skill to your profile.";
            return;
        }
        try {
            window.DevConnect.saveDeveloper(developer);
            form.reset();
            closeModal();
            window.location.href = "profile.html?id=" + encodeURIComponent(developer.id);
        } catch (error) {
            console.error(error);
            message.textContent = "We couldn’t save your profile. Check your browser storage settings and try again.";
        }
    });
}());
