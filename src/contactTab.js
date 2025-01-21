export default function contactPage() {
    const content = document.getElementById("content");
    content.innerHTML = "";
    const heading = document.createElement("h1");
    const managerOne = document.createElement("div");
    const managerTwo = document.createElement("div");
    const managerThree = document.createElement("div");
    heading.textContent = "Contact Us";
    managerOne.textContent = "First manager number: 0800 773 779 Love"
    managerTwo.textContent = "Second manager number: 0800 773 779 Love"
    managerThree.textContent = "Third manager number: 0800 773 779 Love"
    content.appendChild(heading);
    content.appendChild(managerOne);
    content.appendChild(managerTwo);
    content.appendChild(managerThree);
}