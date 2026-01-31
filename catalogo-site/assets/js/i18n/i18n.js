let lang = localStorage.getItem("lang") || "en";

function t(key) {
  return (lang === "no" ? no : en)[key];
}

function setLang(l) {
  localStorage.setItem("lang", l);
  location.reload();
}

function toggleLangMenu() {
  const menu = document.getElementById("lang-menu");
  menu.classList.toggle("show");
}

window.onload = () => {
  const label = document.getElementById("current-lang");
  if (label) label.innerText = lang.toUpperCase();
};
