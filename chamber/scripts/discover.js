import { places } from "../data/discover.mjs";

// Visitor message
const visitorMessage = document.querySelector("#visitor-message");

const now = Date.now();
const lastVisit = localStorage.getItem("discover-last-visit");

if (lastVisit === null) {
    visitorMessage.textContent =
        "Welcome! Let us know if you have any questions.";
} else {
    const timeDifference = now - Number(lastVisit);
    const millisecondsPerDay = 1000 * 60 * 60 * 24;

    if (timeDifference < millisecondsPerDay) {
        visitorMessage.textContent = "Back so soon! Awesome!";
    } else {
        const daysBetweenVisits = Math.floor(
            timeDifference / millisecondsPerDay
        );

        const dayWord = daysBetweenVisits === 1 ? "day" : "days";

        visitorMessage.textContent =
            `You last visited ${daysBetweenVisits} ${dayWord} ago.`;
    }
}

localStorage.setItem("discover-last-visit", now);

// Discover cards
const discoverCards = document.querySelector("#discover-cards");

places.forEach((place) => {
    const card = document.createElement("article");
    card.classList.add("discover-card");

    const heading = document.createElement("h2");
    heading.textContent = place.name;

    const figure = document.createElement("figure");

    const image = document.createElement("img");
    image.src = place.image;
    image.alt = place.name;
    image.loading = "lazy";
    image.width = 300;
    image.height = 200;

    figure.appendChild(image);

    const address = document.createElement("address");
    address.textContent = place.address;

    const description = document.createElement("p");
    description.textContent = place.description;

   const button = document.createElement("button");
button.textContent = "Learn More";
button.type = "button";

button.addEventListener("click", () => {
    const searchQuery = `${place.name} Abia State Nigeria`;
    const searchURL = `https://www.google.com/search?q=${encodeURIComponent(searchQuery)}`;

    window.open(searchURL, "_blank", "noopener,noreferrer");
});

    card.appendChild(heading);
    card.appendChild(figure);
    card.appendChild(address);
    card.appendChild(description);
    card.appendChild(button);

    discoverCards.appendChild(card);
});