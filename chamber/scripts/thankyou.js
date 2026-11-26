const applicationDetails = new URLSearchParams(window.location.search);

const fields = [
    "firstName",
    "lastName",
    "email",
    "phone",
    "organization"
];

fields.forEach((field) => {
    const element = document.querySelector(`#${field}`);
    const value = applicationDetails.get(field);

    if (element) {
        element.textContent = value || "Not provided";
    }
});

const timestampElement = document.querySelector("#timestamp");
const submittedTimestamp = applicationDetails.get("timestamp");

if (timestampElement && submittedTimestamp) {
    const date = new Date(submittedTimestamp);

    timestampElement.textContent = date.toLocaleString();
}