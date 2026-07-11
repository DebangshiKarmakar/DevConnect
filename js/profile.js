const params = new URLSearchParams(window.location.search);

const developerId = Number(params.get("id"));

console.log("Developer ID:", developerId);

async function loadProfile() {

    const response = await fetch("data/developers.json");

    const developers = await response.json();

    console.log("Developers:", developers);

    const developer = developers.find(dev => dev.id === developerId);

    console.log("Found Developer:", developer);

    const container = document.getElementById("profileContainer");

    if (!developer) {
        container.innerHTML = "<h2>Developer not found.</h2>";
        return;
    }

    container.innerHTML = `
        <div class="developer-card">
            <img src="${developer.image}" alt="${developer.name}">
            <h2>${developer.name}</h2>
            <h3>${developer.role}</h3>
            <p>${developer.about}</p>

            <div class="skills">
                ${developer.skills.map(skill => `<span>${skill}</span>`).join("")}
            </div>
        </div>
    `;
}

loadProfile();