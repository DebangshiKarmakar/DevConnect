async function loadDevelopers() {

    try {

        const response = await fetch("data/developers.json");

        const developers = await response.json();

        const developerGrid = document.getElementById("developerGrid");

        developerGrid.innerHTML = "";

        developers.forEach(function(developer){

            developerGrid.innerHTML += `

                <div class="developer-card">

                    <img src="${developer.image}" alt="${developer.name}">

                    <h3>${developer.name}</h3>

                    <h4>${developer.role}</h4>

                    <p>${developer.about}</p>

                    <div class="skills">

                        ${developer.skills.map(skill => `<span>${skill}</span>`).join("")}

                    </div>

                    <a href="profile.html?id=${developer.id}">
                         <button class="profile-btn">
                         View Profile
                        </button>
                    </a>
                </div>

            `;

        });

    }

    catch(error){

        console.error(error);

    }

}

loadDevelopers();