import Views from "./views.js";

const render = new Views;
if(localStorage.getItem("pokemon") === null) {
    window.onload = render.formView()
}
else {
    window.onload = render.homeView()
}



document.querySelector("#formBtn").addEventListener("click", () => {
    document.querySelector("#homeView").classList.add("hidden");
    render.formView();
    document.querySelector("#formView").classList.remove("hidden");
})

document.querySelector("#backBtn").addEventListener("click", () => {
    document.querySelector("#formView").classList.add("hidden");
    render.homeView();
    document.querySelector("#homeView").classList.remove("hidden");
})