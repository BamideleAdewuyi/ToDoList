import homePage from "./homeTab";
import menuPage from "./menuTab";
import contactPage from "./contactTab";
import "./style.css";
homePage();
const homeButton = document.getElementById("home");
const menuButton = document.getElementById("menu");
const contactButton = document.getElementById("contact")
homeButton.addEventListener("click", homePage);
menuButton.addEventListener("click", menuPage);
contactButton.addEventListener("click", contactPage);