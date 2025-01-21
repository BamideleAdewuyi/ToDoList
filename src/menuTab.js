export default function menuPage() {
    const content = document.getElementById("content");
    content.innerHTML = "";
    const heading = document.createElement("h1");
    const menu = document.createElement("div");
    heading.textContent = "Menu";
    menu.textContent = "Tasty beverages, toothsome dishes"
    content.appendChild(heading);
    content.appendChild(menu);
}