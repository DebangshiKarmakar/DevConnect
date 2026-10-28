(function () {
    const developersKey = "devconnect.developers";

    function escapeHTML(value) {
        return String(value == null ? "" : value).replace(/[&<>"']/g, function (character) {
            return {
                "&": "&amp;",
                "<": "&lt;",
                ">": "&gt;",
                '"': "&quot;",
                "'": "&#39;"
            }[character];
        });
    }

    function safeExternalUrl(value) {
        try {
            const url = new URL(value);
            return url.protocol === "https:" || url.protocol === "http:" ? url.href : "";
        } catch (error) {
            return "";
        }
    }

    async function fetchJSON(path) {
        const response = await fetch(path);
        if (!response.ok) {
            throw new Error("Could not load " + path + " (" + response.status + ").");
        }
        return response.json();
    }

    async function loadDevelopers() {
        const developers = await fetchJSON("data/developers.json");
        if (!Array.isArray(developers)) {
            throw new Error("Developer data has an unexpected format.");
        }
        const savedDevelopers = JSON.parse(localStorage.getItem(developersKey) || "[]");
        if (!Array.isArray(savedDevelopers)) {
            throw new Error("Saved developer data has an unexpected format.");
        }
        return developers.concat(savedDevelopers);
    }

    async function loadProjects() {
        const projects = await fetchJSON("data/projects.json");
        if (!Array.isArray(projects)) {
            throw new Error("Project data has an unexpected format.");
        }
        return projects;
    }

    function saveDeveloper(developer) {
        const savedDevelopers = JSON.parse(localStorage.getItem(developersKey) || "[]");
        if (!Array.isArray(savedDevelopers)) {
            throw new Error("Saved developer data has an unexpected format.");
        }
        savedDevelopers.push(developer);
        localStorage.setItem(developersKey, JSON.stringify(savedDevelopers));
    }

    window.DevConnect = {
        escapeHTML: escapeHTML,
        safeExternalUrl: safeExternalUrl,
        loadDevelopers: loadDevelopers,
        loadProjects: loadProjects,
        saveDeveloper: saveDeveloper
    };
}());