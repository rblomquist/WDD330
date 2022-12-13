let h2 = document.querySelector("h2");
let img = document.querySelector("img");
let url = ""

let activePokemon = JSON.parse(localStorage.getItem("active"));
let jsonPokemon = JSON.parse(localStorage.getItem("pokemon"));

for (const [key,value] of Object.entries(jsonPokemon)) {
    console.log(value.name)
    if (value.name == activePokemon.name) {
        url = value.url
    }
}

getOnePokemon(url)

async function getOnePokemon(url) {
    let response = await fetch(url);
    
    if (response.ok) {
        let data = await response.json();
        console.log(data);
        h2.textContent = data.name;
        img.setAttribute("src", data.sprites.front_default);
    }
}

const feed = document.querySelector("#feed");
const pet = document.querySelector("#pet");
const play = document.querySelector("#play");

const pokemon = document.querySelector("#pokemon");

feed.addEventListener("click", () => {
    pokemon.removeAttribute("class");
    setTimeout(function(){
        pokemon.classList.add("feed");
    },10)
});
pet.addEventListener("click", () => {
    pokemon.removeAttribute("class");
    setTimeout(function(){
        pokemon.classList.add("pet");
    },10)
});
play.addEventListener("click", () => {
    pokemon.removeAttribute("class");
    setTimeout(function(){
        pokemon.classList.add("play");
    },10)
});


