(function () {
    const container = document.getElementById("profileContainer");
    if (!container) return;

    const developerId = new URLSearchParams(window.location.search).get("id");
    if (!developerId) return;

    const pageHero = document.querySelector(".page-hero");
    if (pageHero) pageHero.hidden = true;
    const searchBox = document.querySelector(".page-content .search-box");
    if (searchBox) searchBox.hidden = true;
    const grid = document.getElementById("developerGrid");
    if (grid) grid.hidden = true;
    const search = document.getElementById("searchInput");
    if (search) search.hidden = true;
    document.querySelectorAll(".filter-buttons").forEach(function (element) {
        element.hidden = true;
    });

    window.DevConnect.loadDevelopers().then(function (developers) {
        const developer = developers.find(function (item) {
            return String(item.id) === developerId;
        });
        if (!developer) {
            container.innerHTML = '<div class="empty-state"><h2>Developer not found</h2><p>This profile may have been removed or the link may be incorrect.</p><a class="text-link" href="profile.html">Browse the community →</a></div>';
            return;
        }
        const skills = Array.isArray(developer.skills) ? developer.skills : [];
        const imageUrl = window.DevConnect.safeExternalUrl(developer.image);
        const image = imageUrl
            ? '<img src="' + window.DevConnect.escapeHTML(imageUrl) + '" alt="' + window.DevConnect.escapeHTML(developer.name) + '" loading="lazy">'
            : '<span class="avatar-fallback profile-avatar-fallback" aria-hidden="true">' + window.DevConnect.escapeHTML(developer.name.slice(0, 1).toUpperCase()) + '</span>';
        const github = window.DevConnect.safeExternalUrl(developer.github);
        const linkedin = window.DevConnect.safeExternalUrl(developer.linkedin);
        container.innerHTML = '<article class="profile-detail">' +
            '<div class="profile-cover"></div><div class="profile-detail-content"><div class="profile-detail-avatar">' + image + '</div>' +
            '<p class="eyebrow">DEVCONNECT MEMBER</p><h1>' + window.DevConnect.escapeHTML(developer.name) + '</h1>' +
            '<p class="developer-role">' + window.DevConnect.escapeHTML(developer.role) + '</p>' +
            '<p class="profile-about">' + window.DevConnect.escapeHTML(developer.about) + '</p>' +
            (developer.location ? '<p class="profile-location">⌖ ' + window.DevConnect.escapeHTML(developer.location) + '</p>' : '') +
            '<div class="skills">' + skills.map(function (skill) {
                return '<span>' + window.DevConnect.escapeHTML(skill) + '</span>';
            }).join("") + '</div><div class="profile-actions">' +
            (developer.email ? '<a class="primary-btn" href="mailto:' + encodeURIComponent(developer.email) + '">Say hello <span aria-hidden="true">↗</span></a>' : '') +
            (github ? '<a class="secondary-btn" href="' + window.DevConnect.escapeHTML(github) + '" target="_blank" rel="noopener noreferrer">GitHub</a>' : '') +
            (linkedin ? '<a class="secondary-btn" href="' + window.DevConnect.escapeHTML(linkedin) + '" target="_blank" rel="noopener noreferrer">LinkedIn</a>' : '') +
            '</div><a class="back-link" href="profile.html">← Back to all developers</a></div></article>';
    }).catch(function (error) {
        console.error(error);
        container.innerHTML = '<div class="empty-state error-state"><h2>We couldn’t load this profile</h2><p>' + window.DevConnect.escapeHTML(error.message) + '</p></div>';
    });
}());
