import Views from "./views.js";

// export const pokemon = {}
// await getOnePokemon();
// getOnePokemon();


const render = new Views;
window.onload = getAllPokemon(render.homeView);
// window.onload = getAllPokemon(render.formView);

// let url = "https://pokeapi.co/api/v2/pokemon/";
// let url1 = "https://pokeapi.co/api/v2/pokemon/151"



// let url = "https://pokeapi.co/api/v2/pokemon?limit=151";
   
export async function getAllPokemon(callback) {
    let response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151");
    
    if (response.ok) {
        let data = await response.json();
        // console.log(data.results)
        
        if (callback) {
        callback()}
    }  
}

// async function getAllPokemon() {
//     return await fetch(url,
//         {
//             method: "GET",
//             headers: {"Accept": "application/json", "Content-Type": "application/json",}
//         }  )
//         .then((response) => response.json())
//     .then((responseData) => {
//     //   console.log(responseData);
//       return responseData;
//     })
//     .catch(error => console.warn(error));
// }

// let results = getAllPokemon(url).then(response => {results = response})
// let results = getAllPokemon(url)
// console.log(results)


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
    // const storePokemon = JSON.stringify(pokemon);
    // localStorage.setItem("pokemon", storePokemon)
}

// console.log(pokemon)
// console.log(pokemon.length)
