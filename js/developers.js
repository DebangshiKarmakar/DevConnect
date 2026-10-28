(function () {
    const grid = document.getElementById("developerGrid");
    if (!grid) return;

    let developers = [];
    let query = "";
    let roleFilter = "all";

    function render(list) {
        if (!list.length) {
            grid.innerHTML = '<div class="empty-state"><span>⌕</span><h3>No developers found</h3><p>Try a different search or clear the role filter.</p></div>';
            return;
        }

        grid.innerHTML = list.map(function (developer) {
            const skills = Array.isArray(developer.skills) ? developer.skills : [];
            const imageUrl = window.DevConnect.safeExternalUrl(developer.image);
            const image = imageUrl
                ? '<img src="' + window.DevConnect.escapeHTML(imageUrl) + '" alt="" loading="lazy">'
                : '<span class="avatar-fallback" aria-hidden="true">' + window.DevConnect.escapeHTML(developer.name.slice(0, 1).toUpperCase()) + '</span>';
            return '<article class="developer-card">' +
                '<div class="developer-avatar">' + image + '</div>' +
                '<h3>' + window.DevConnect.escapeHTML(developer.name) + '</h3>' +
                '<p class="developer-role">' + window.DevConnect.escapeHTML(developer.role) + '</p>' +
                '<p class="developer-about">' + window.DevConnect.escapeHTML(developer.about) + '</p>' +
                '<div class="skills">' + skills.slice(0, 5).map(function (skill) {
                    return '<span>' + window.DevConnect.escapeHTML(skill) + '</span>';
                }).join("") + '</div>' +
                '<a class="profile-btn" href="profile.html?id=' + encodeURIComponent(developer.id) + '">View profile <span aria-hidden="true">→</span></a>' +
                '</article>';
        }).join("");
    }

    function applyFilters() {
        const normalizedQuery = query.trim().toLowerCase();
        const filtered = developers.filter(function (developer) {
            const searchable = [developer.name, developer.role, developer.about, developer.location]
                .concat(Array.isArray(developer.skills) ? developer.skills : []).join(" ").toLowerCase();
            return (roleFilter === "all" || developer.role === roleFilter) && searchable.includes(normalizedQuery);
        });
        render(filtered);
    }

    const searchInput = document.getElementById("searchInput");
    if (searchInput) {
        searchInput.addEventListener("input", function () {
            query = searchInput.value;
            applyFilters();
        });
    }

    document.querySelectorAll(".filter-btn[data-role]").forEach(function (button) {
        button.addEventListener("click", function () {
            document.querySelectorAll(".filter-btn[data-role]").forEach(function (item) {
                item.classList.toggle("active", item === button);
            });
            roleFilter = button.dataset.role || "all";
            applyFilters();
        });
    });

    window.DevConnect.loadDevelopers().then(function (items) {
        developers = items;
        applyFilters();
    }).catch(function (error) {
        console.error(error);
        grid.innerHTML = '<div class="empty-state error-state"><h3>We couldn’t load the community</h3><p>' + window.DevConnect.escapeHTML(error.message) + ' Try opening this site through a local web server.</p></div>';
    });
}());
