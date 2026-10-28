(function () {
    const grid = document.getElementById("projectGrid");
    if (!grid) return;

    let projects = [];
    let query = "";
    let technologyFilter = "all";

    function render(items) {
        if (!items.length) {
            grid.innerHTML = '<div class="empty-state"><span>✦</span><h3>No projects found</h3><p>Try another search or technology.</p></div>';
            return;
        }

        grid.innerHTML = items.map(function (project) {
            const technologies = Array.isArray(project.tech) ? project.tech : [];
            const title = window.DevConnect.escapeHTML(project.title);
            return '<article class="project-card">' +
                '<div class="project-card-top"><span class="project-symbol" aria-hidden="true">✳</span><span class="project-id">PROJECT / ' + String(project.id).padStart(2, "0") + '</span></div>' +
                '<h3>' + title + '</h3>' +
                '<p>' + window.DevConnect.escapeHTML(project.description) + '</p>' +
                '<div class="project-tech">' + technologies.map(function (tech) {
                    return '<span>' + window.DevConnect.escapeHTML(tech) + '</span>';
                }).join("") + '</div>' +
                '<a class="project-link" href="search.html?q=' + encodeURIComponent(project.title) + '">Find collaborators <span aria-hidden="true">→</span></a>' +
                '</article>';
        }).join("");
    }

    function applyFilters() {
        const normalizedQuery = query.trim().toLowerCase();
        render(projects.filter(function (project) {
            const technologies = Array.isArray(project.tech) ? project.tech : [];
            const searchable = [project.title, project.description].concat(technologies).join(" ").toLowerCase();
            return (technologyFilter === "all" || technologies.includes(technologyFilter)) && searchable.includes(normalizedQuery);
        }));
    }

    const searchInput = document.getElementById("projectSearch");
    const filters = document.getElementById("projectFilters");
    if (searchInput) {
        searchInput.addEventListener("input", function () {
            query = searchInput.value;
            applyFilters();
        });
    }

    window.DevConnect.loadProjects().then(function (items) {
        projects = items;
        if (filters) {
            const technologies = Array.from(new Set(items.reduce(function (all, project) {
                return all.concat(Array.isArray(project.tech) ? project.tech : []);
            }, []))).sort();
            filters.innerHTML = '<button class="filter-btn active" type="button" data-tech="all">All projects</button>' +
                technologies.map(function (tech) {
                    return '<button class="filter-btn" type="button" data-tech="' + window.DevConnect.escapeHTML(tech) + '">' + window.DevConnect.escapeHTML(tech) + '</button>';
                }).join("");
            filters.addEventListener("click", function (event) {
                const button = event.target.closest("button[data-tech]");
                if (!button) return;
                filters.querySelectorAll("button").forEach(function (item) {
                    item.classList.toggle("active", item === button);
                });
                technologyFilter = button.dataset.tech;
                applyFilters();
            });
        }
        applyFilters();
    }).catch(function (error) {
        console.error(error);
        grid.innerHTML = '<div class="empty-state error-state"><h3>We couldn’t load the projects</h3><p>' + window.DevConnect.escapeHTML(error.message) + ' Try opening this site through a local web server.</p></div>';
    });
}());
