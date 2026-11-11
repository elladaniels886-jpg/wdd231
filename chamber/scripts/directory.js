
const menuButton = document.querySelector("#menu-button");
const navigation = document.querySelector("#primary-navigation");

menuButton.addEventListener("click", () => {
    navigation.classList.toggle("open");

    const isOpen = navigation.classList.contains("open");

    menuButton.setAttribute("aria-expanded", isOpen);

    menuButton.setAttribute(
        "aria-label",
        isOpen ? "Close navigation menu" : "Open navigation menu"
    );

    menuButton.textContent = isOpen ? "✕" : "☰";
});



const currentYear = new Date().getFullYear();

document.querySelector("#current-year").textContent = currentYear;

const lastModified = document.lastModified;

document.querySelector("#last-modified").textContent =
    `Last Modified: ${lastModified}`;


const membersContainer = document.querySelector("#members-container");

const gridButton = document.querySelector("#grid-view");

const listButton = document.querySelector("#list-view");


async function getMembers() {
    try {
        const response = await fetch("data/members.json");

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const members = await response.json();

        displayMembers(members);

    } catch (error) {
        console.error("Unable to load business members:", error);

        membersContainer.textContent =
            "Sorry, the business directory could not be loaded.";
    }
}


function displayMembers(members) {

    membersContainer.innerHTML = "";

    members.forEach((member) => {

        
        const card = document.createElement("article");

        card.classList.add("member-card");


       
        const image = document.createElement("img");

        image.src = `images/${member.image}`;

        image.alt = `${member.name} business`;

        image.classList.add("member-image");

        image.loading = "lazy";


        const name = document.createElement("h2");

        name.textContent = member.name;


        const address = document.createElement("p");

        address.textContent = member.address;


        
        const phone = document.createElement("p");

        phone.textContent = member.phone;


      
        const website = document.createElement("a");

        website.href = member.website;

        website.textContent = "Visit Website";

        website.target = "_blank";

        website.rel = "noopener noreferrer";


        const membership = document.createElement("span");

        membership.classList.add("membership");

        const membershipNames = {
            1: "Member",
            2: "Silver Member",
            3: "Gold Member"
        };

        membership.textContent =
            membershipNames[member.membershipLevel] || "Member";

        const description = document.createElement("p");

        description.textContent = member.description;


        card.appendChild(image);

        card.appendChild(name);

        card.appendChild(description);

        card.appendChild(address);

        card.appendChild(phone);

        card.appendChild(website);

        card.appendChild(membership);


   
        membersContainer.appendChild(card);

    });

}




gridButton.addEventListener("click", () => {

    membersContainer.classList.add("members-grid");

    membersContainer.classList.remove("members-list");

    gridButton.classList.add("active-view");

    listButton.classList.remove("active-view");

    gridButton.setAttribute("aria-pressed", "true");

    listButton.setAttribute("aria-pressed", "false");

});


listButton.addEventListener("click", () => {

    membersContainer.classList.remove("members-grid");

    membersContainer.classList.add("members-list");

    listButton.classList.add("active-view");

    gridButton.classList.remove("active-view");

    listButton.setAttribute("aria-pressed", "true");

    gridButton.setAttribute("aria-pressed", "false");

});



getMembers();