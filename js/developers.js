let developers = [];

let currentSearch = "";

let currentFilter = "all";

// ===========================
// DISPLAY DEVELOPERS
// ===========================

function displayDevelopers(developerList) {

    const developerGrid = document.getElementById("developerGrid");

    developerGrid.innerHTML = "";

    developerList.forEach(function (developer) {

        developerGrid.innerHTML += `

}

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
// ===========================
// APPLY SEARCH + FILTER
// ===========================

function applyFilters() {

    let filtered = developers;

    // Search

    if(currentSearch !== ""){

        filtered = filtered.filter(function(developer){

            return (

                developer.name.toLowerCase().includes(currentSearch)

                ||

                developer.role.toLowerCase().includes(currentSearch)

                ||

                developer.skills.join(" ").toLowerCase().includes(currentSearch)

            );

        });

    }

    // Role Filter

    if(currentFilter !== "all"){

        filtered = filtered.filter(function(developer){

            return developer.role === currentFilter;

        });

    }

    displayDevelopers(filtered);

}
// ===========================
// LOAD DEVELOPERS
// ===========================

async function loadDevelopers() {

    try {

        const response = await fetch("data/developers.json");

        developers = await response.json();

        displayDevelopers(developers);

    }

    catch (error) {

        console.error(error);

    }

}

loadDevelopers();
// ===========================
// SEARCH DEVELOPERS
// ===========================

const searchInput = document.getElementById("searchInput");

if (searchInput) {

    searchInput.addEventListener("input", function () {

        currentSearch = searchInput.value.toLowerCase();

        applyFilters();

    });

}
// ===========================
// FILTER DEVELOPERS
// ===========================

const filterButtons = document.querySelectorAll(".filter-btn");

filterButtons.forEach(function(button){

    button.addEventListener("click", function(){

        // Remove active class
        filterButtons.forEach(function(btn){

            btn.classList.remove("active");

        });

        // Highlight clicked button
        button.classList.add("active");

        currentFilter = button.dataset.role;

        applyFilters();

    });

});