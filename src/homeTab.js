export default function homePage() {
    const content = document.getElementById("content");
    content.innerHTML = "";
    const title = document.createElement("h1");
    const description = document.createElement("div");
    const hours = document.createElement("div");
    const address = document.createElement("div");
    title.textContent = "Let Him Cook";
    description.textContent = "Description of culinary process"
    hours.textContent = "Open every day 6am - 10pm";
    address.textContent = "5 Mulholland Drive";
    content.appendChild(title);
    content.appendChild(description);
    content.appendChild(hours);
    content.appendChild(address);
}

