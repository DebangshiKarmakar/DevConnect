(function () {
    const input = document.getElementById("globalSearch");
    const resultsContainer = document.getElementById("searchResults");
    const summary = document.getElementById("searchSummary");
    if (!input || !resultsContainer || !summary) return;

    const params = new URLSearchParams(window.location.search);
    input.value = params.get("q") || "";
    const queryType = params.get("type");
    let developers = [];
    let projects = [];

    function render() {
        const query = input.value.trim().toLowerCase();
        const people = developers.filter(function (developer) {
            const searchable = [developer.name, developer.role, developer.about, developer.location]
                .concat(Array.isArray(developer.skills) ? developer.skills : []).join(" ").toLowerCase();
            return searchable.includes(query);
        });
        const matchedProjects = projects.filter(function (project) {
            const searchable = [project.title, project.description].concat(Array.isArray(project.tech) ? project.tech : []).join(" ").toLowerCase();
            return searchable.includes(query);
        });
        const sections = [];

        if (queryType !== "projects") {
            sections.push('<section class="search-section"><div class="search-section-heading"><h2>People</h2><span>' + people.length + '</span></div>' +
                (people.length ? '<div class="developer-grid">' + people.map(function (developer) {
                    const skills = Array.isArray(developer.skills) ? developer.skills : [];
                    const imageUrl = window.DevConnect.safeExternalUrl(developer.image);
                    return '<article class="developer-card"><div class="developer-avatar">' +
                        (imageUrl ? '<img src="' + window.DevConnect.escapeHTML(imageUrl) + '" alt="" loading="lazy">' : '<span class="avatar-fallback" aria-hidden="true">' + window.DevConnect.escapeHTML(developer.name.slice(0, 1).toUpperCase()) + '</span>') +
                        '</div><h3>' + window.DevConnect.escapeHTML(developer.name) + '</h3><p class="developer-role">' + window.DevConnect.escapeHTML(developer.role) + '</p>' +
                        '<p class="developer-about">' + window.DevConnect.escapeHTML(developer.about) + '</p><div class="skills">' +
                        skills.slice(0, 4).map(function (skill) { return '<span>' + window.DevConnect.escapeHTML(skill) + '</span>'; }).join("") +
                        '</div><a class="profile-btn" href="profile.html?id=' + encodeURIComponent(developer.id) + '">View profile <span aria-hidden="true">→</span></a></article>';
                }).join("") + '</div>' : '<p class="empty-inline">No people match this search yet.</p>') + '</section>');
        }
        if (queryType !== "developers") {
            sections.push('<section class="search-section"><div class="search-section-heading"><h2>Projects</h2><span>' + matchedProjects.length + '</span></div>' +
                (matchedProjects.length ? '<div class="project-grid">' + matchedProjects.map(function (project) {
                    const technologies = Array.isArray(project.tech) ? project.tech : [];
                    return '<article class="project-card"><div class="project-card-top"><span class="project-symbol" aria-hidden="true">✳</span><span class="project-id">PROJECT / ' +
                        String(project.id).padStart(2, "0") + '</span></div><h3>' + window.DevConnect.escapeHTML(project.title) + '</h3><p>' +
                        window.DevConnect.escapeHTML(project.description) + '</p><div class="project-tech">' +
                        technologies.map(function (tech) { return '<span>' + window.DevConnect.escapeHTML(tech) + '</span>'; }).join("") +
                        '</div><a class="project-link" href="search.html?q=' + encodeURIComponent(project.title) + '">Find collaborators <span aria-hidden="true">→</span></a></article>';
                }).join("") + '</div>' : '<p class="empty-inline">No projects match this search yet.</p>') + '</section>');
        }

        const total = (queryType === "projects" ? 0 : people.length) + (queryType === "developers" ? 0 : matchedProjects.length);
        summary.textContent = query ? total + " result" + (total === 1 ? "" : "s") + ' for “' + input.value.trim() + '”' : "Explore the people and projects in our community.";
        resultsContainer.innerHTML = sections.join("");
    }

    input.addEventListener("input", render);
    document.addEventListener("keydown", function (event) {
        if (event.key === "/" && !["INPUT", "TEXTAREA"].includes(document.activeElement.tagName)) {
            event.preventDefault();
            input.focus();
        }
    });

    Promise.all([window.DevConnect.loadDevelopers(), window.DevConnect.loadProjects()]).then(function (data) {
        developers = data[0];
        projects = data[1];
        render();
    }).catch(function (error) {
        console.error(error);
        summary.textContent = "Search is temporarily unavailable.";
        resultsContainer.innerHTML = '<div class="empty-state error-state"><p>' + window.DevConnect.escapeHTML(error.message) + ' Try opening this site through a local web server.</p></div>';
    });
}());
