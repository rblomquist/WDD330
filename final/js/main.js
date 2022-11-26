import Views from "./views.js";

const render = new Views;
const pokemon = {}
// window.onload = render.initialView;
// window.onload = render.formView;

// let url = "https://pokeapi.co/api/v2/pokemon?limit=151";
// let url1 = "https://pokeapi.co/api/v2/pokemon/151"



// let url = "https://pokeapi.co/api/v2/pokemon";
   
async function getAllPokemon(url) {
    let response = await fetch(url);
    
    if (response.ok) {
        let data = await response.json();
        console.log(data)
    }
}
// getAllPokemon(url);

async function getOnePokemon() {
    for (let i=1; i < 152; i++){
        let url = `https://pokeapi.co/api/v2/pokemon/${i}`
        let response = await fetch(url);

        if (response.ok) {
            let data = await response.json();
            let name = data.name
            pokemon[name] = data;
            // console.log(data.name)
    }}
}

await getOnePokemon()
console.log(pokemon)
console.log(pokemon.length)
