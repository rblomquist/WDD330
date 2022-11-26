
let url = "https://pokeapi.co/api/v2/pokemon";
let offset = 0
let code = 2

window.addEventListener("load", () =>{
    getAllPokemon(url);
    buildMenu()
})

async function getAllPokemon(url) {
    let response = await fetch(url);
    
    if (response.ok) {
        let data = await response.json();
        const parent = document.querySelector("#pokemon");
        parent.classList.add("grid")
        drawCards(data, parent)
    }
}

function drawCards(data, parent) {
    parent.innerHTML = "";
    data.results.forEach( (result) => {
        const div = document.createElement("div");
        div.classList.add("card");
        div.addEventListener("click", () => expand(result.url))
        const pokemonName = result.name

        div.innerText = pokemonName;

        parent.appendChild(div);
        }
    );
}

function buildMenu() {
    document.querySelector("#menu").innerHTML = "";
    document.querySelector("#menu").classList.add("flex");

    document.querySelector("#menu").innerHTML = 
    `<button id="previous">Prev</button>
    <button id="one" class="active">1</button>
    <button id="two">2</button>
    <button id="three">3</button>
    <button id="four">4</button>
    <button id="five">5</button>
    <button id="six">6</button>
    <button id="seven">7</button>
    <button id="eight">8</button>
    <button id="next">Next</button>
    <button><a href="index.html">Home</a></button>`

    document.querySelector("#previous").addEventListener("click", () => changePage(1));
    document.querySelector("#one").addEventListener("click", () => changePage(2));
    document.querySelector("#two").addEventListener("click", () => changePage(3));
    document.querySelector("#three").addEventListener("click", () => changePage(4));
    document.querySelector("#four").addEventListener("click", () => changePage(5));
    document.querySelector("#five").addEventListener("click", () => changePage(6));
    document.querySelector("#six").addEventListener("click", () => changePage(7));
    document.querySelector("#seven").addEventListener("click", () => changePage(8));
    document.querySelector("#eight").addEventListener("click", () => changePage(9));
    document.querySelector("#next").addEventListener("click", () => changePage(10));
}


function changePage(type) {
    const menu = document.querySelector("#menu")
    const children = Array.from(menu.children)

    children.forEach( child => {
        if(child.classList.contains("active")) {
            child.classList.remove("active")
        }
    })

    switch(type){
    case 1:
        if(offset != 0){
            offset -= 20
        }
        url = `https://pokeapi.co/api/v2/pokemon/?limit=20&offset=${offset}`;
        getAllPokemon(url);
        if(code > 2){
            code--;
        }
        changePage(code)
        break;
    case 2:
        document.querySelector("#one").classList.add("active");
        url ="https://pokeapi.co/api/v2/pokemon"
        getAllPokemon(url)
        code = 2;
        offset = 0;
        break;
    case 3:
        document.querySelector("#two").classList.add("active");
        url = `https://pokeapi.co/api/v2/pokemon/?limit=20&offset=20`;
        getAllPokemon(url)
        code = 3;
        offset = 20;
        break;
    case 4:
        document.querySelector("#three").classList.add("active");
        url = `https://pokeapi.co/api/v2/pokemon/?limit=20&offset=40`;
        getAllPokemon(url)
        code = 4;
        offset = 40;
        break;
    case 5:
        document.querySelector("#four").classList.add("active");
        url = `https://pokeapi.co/api/v2/pokemon/?limit=20&offset=60`;
        getAllPokemon(url)
        code = 5;
        offset = 60;
        break;
    case 6:
        document.querySelector("#five").classList.add("active");
        url = `https://pokeapi.co/api/v2/pokemon/?limit=20&offset=80`;
        getAllPokemon(url)
        code = 6;
        offset = 80;
        break;
    case 7:
        document.querySelector("#six").classList.add("active");
        url = `https://pokeapi.co/api/v2/pokemon/?limit=20&offset=100`;
        getAllPokemon(url)
        code = 7;
        offset = 100;
        break;
    case 8:
        document.querySelector("#seven").classList.add("active");
        url = `https://pokeapi.co/api/v2/pokemon/?limit=20&offset=120`;
        getAllPokemon(url)
        code = 8;
        offset = 120;
        break;
    case 9:
        document.querySelector("#eight").classList.add("active");
        url = `https://pokeapi.co/api/v2/pokemon/?limit=11&offset=140`;
        getAllPokemon(url)
        code = 9;
        offset = 140;
        break;
    case 10:
        let limit = 20
        if (offset < 140) {
            offset += 20
        }

        if (offset == 140) {
            limit = 11;
        }
        
        url = `https://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=${offset}`;
        getAllPokemon(url);
        if(code < 9){
            code++;
        }
        changePage(code)
        break;
    }
}

// -------------------------------------------------------------------------


function expand(url) {
    getSinglePokemon(url)
}

async function getSinglePokemon(url) {
    let response = await fetch(url);
    
    if (response.ok) {
        let data = await response.json();
        const parent = document.querySelector("#pokemon");
        drawSingleCard(data, parent)
    }
}

function drawSingleCard(data, parent) {
    parent.innerHTML = "";
    parent.classList.remove("grid")
    parent.classList.add("single")
    const div = document.createElement("div");
    const div2 = document.createElement("div");
    const div3 = document.createElement("div");
    const p = document.createElement("p");
    const p2 = document.createElement("p");
    const p3 = document.createElement("p");
    const name = data.name;
    const img = data.sprites.front_default;
    
    div.innerHTML =
        `<h2>${name}</h2>
        <img src="${img}" height=200>`

    div2.innerHTML = 
        `<h3>type</h3>`
        
    for (let i = 0; i < data.types.length; i++) {
        p2.innerHTML += `${data.types[i].type.name} <br>`;
    }
    div2.append(p2);
    
    div3.innerHTML =
        `<h3>Stats</h3>`

    for (let i=0; i < data.stats.length; i++) {
        p3.innerHTML += `${data.stats[i].stat.name} = ${data.stats[i].base_stat} <br>`;
    }
    div3.appendChild(p3);
    
    parent.appendChild(div);
    parent.appendChild(div2);
    parent.appendChild(div3);

    backButton()
}    

function backButton() {
    const button = document.createElement("button");
    button.classList.add("backButton")
    button.innerHTML = "Back";
    document.querySelector("#menu").innerHTML = "";

    button.addEventListener("click", () => { 
        buildMenu()
        changePage(code);
        }
    )
    document.querySelector("#menu").appendChild(button)

}