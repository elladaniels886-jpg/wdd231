const spotlightsContainer = document.querySelector("#spotlights-container");

async function getSpotlights() {
    try {
        const response = await fetch("data/members.json");

        if (!response.ok) {
            throw new Error("Member data could not be retrieved.");
        }

        const members = await response.json();

        // Select businesses with Silver or Gold membership
        const eligibleMembers = members.filter(
            member => member.membershipLevel === 2 ||
                      member.membershipLevel === 3
        );

        // Randomly shuffle the eligible businesses
        const shuffledMembers = eligibleMembers.sort(
            () => Math.random() - 0.5
        );

        // Select three businesses
        const selectedMembers = shuffledMembers.slice(0, 3);

        // Clear the loading message
        spotlightsContainer.innerHTML = "";

        // Display each selected business
        selectedMembers.forEach(member => {
            const card = document.createElement("article");
            card.classList.add("spotlight-card");

            card.innerHTML = `
                <img src="images/${member.image}" alt="${member.name} logo">
                <h3>${member.name}</h3>
                <p>${member.description}</p>
                <p>${member.address}</p>
                <p>${member.phone}</p>
                <a href="${member.website}" target="_blank" rel="noopener noreferrer">
                    Visit Website
                </a>
            `;

            spotlightsContainer.appendChild(card);
        });

    } catch (error) {
        console.error("Spotlights error:", error);
        spotlightsContainer.textContent =
            "Business spotlights are currently unavailable.";
    }
}

getSpotlights();