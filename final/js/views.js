
export default class Views {
    constructor (){
        // this.url = "https://pokeapi.co/api/v2/pokemon";
        // this.offset = 0;
        // this.code = 2;
        // this.pokemonList = pokemon
    }

    homeView() {
        const pokemon2 = {}
        const pokemonList = localStorage.getItem("pokemon");
        const jsonPokemon = JSON.parse(pokemonList)
        console.log(jsonPokemon)
        // draws the home page
        document.body.innerHTML = 
        `<h1>Pokemon Team</h1>
        <ul id="mainTeam">
            <li class="blackBorder active"><h2>${jsonPokemon[1].name}</h2><img><p></p></li>
            <li class="blackBorder"><h2>${jsonPokemon[2].name}</h2><img><p></p></li>
            <li class="blackBorder"><h2>${jsonPokemon[3].name}</h2><img><p></p></li>
            <li class="blackBorder"><h2>${jsonPokemon[4].name}</h2><img><p></p></li>
            <li class="blackBorder"><h2>${jsonPokemon[5].name}</h2><img><p></p></li>
            <li class="blackBorder"><h2>${jsonPokemon[6].name}</h2><img><p></p></li>
        </ul>
        <div id="mainNav">
            <button><a href="pokemonList.html">Change</a></button>
            <button>Interact</button>
            <button><a href="pokemonList.html">Browse</a></button>
        </div>`

        // sets up the event listeners for the home page
        const team = document.querySelector("#mainTeam")
        const children = Array.from(team.children)

        children.forEach( child => {child.addEventListener("click", active)})

        function active(e) {
            children.forEach( child => {if(child.classList.contains("active")) {
                child.classList.remove("active")}
            e.currentTarget.classList.add("active")})}

        for (const [key,value] of Object.entries(jsonPokemon)) {
            // console.log(value.url)
            getOnePokemon(value.url)
    
            
        }

        async function getOnePokemon(url) {
            let response = await fetch(url);
            
            if (response.ok) {
                let data = await response.json();
                console.log(data)
                // pokemon2[data.name] = data
                children.forEach (child => {
                    if(child.querySelector("h2").textContent == data.name) {
                        console.log(data.name)
                        child.querySelector("img").setAttribute("src", data.sprites.front_default)
                        child.querySelector("img").setAttribute("alt", data.name)
                        // child.querySelector("p").innerHTML = "test"

                        data.stats.forEach(stat => {

                        child.querySelector("p").innerHTML += 
                                `${stat.stat.name} - ${stat.base_stat}<br>`
                        })

                    }
            }  )
        }

            // jsonPokemon.entries.forEach( ([key, value]) => {console.log(value.url)})

    }
}

    formView() {
        async function getAllPokemon() {
            let response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151");
            
            if (response.ok) {
                let data = await response.json();
                
                document.body.innerHTML =
                `<h1>Update Team</h1>
                <form>
                    <ul id="mainTeam">
                    </ul>
                    
                    <button id="submitBtn">Submit</button>
                    <input type="submit" id="backBtn" value="back">
                </form>`
                
                buildForm()
                buildForm()
                buildForm()
                buildForm()
                buildForm()
                buildForm()
                submit()
                back()


                function buildForm() {
                    let li = document.createElement("li");
                    let form = document.createElement("form");
                    form.classList.add("blackBorder");
                    
                    let select = document.createElement("select");
                    select.classList.add("selectPokemon")
                    select.innerHTML = "<option value='test'>Choose Your Pokemon</option>"
                    data.results.forEach (result => {select.innerHTML += `<option name=${result.name} value=${result.name}>${result.name}</option>`})
                                        
                    form.appendChild(select);
                    li.appendChild(form);
                    document.querySelector("#mainTeam").appendChild(form);
                }
             
            
                function submit() {
                    const submitBtn = document.querySelector("#submitBtn");
                    const list = document.querySelectorAll(".selectPokemon")
                    submitBtn.addEventListener("click", 
                        function value(e) {
                            e.preventDefault()
                            const currentList = {};
                            let i = 1;
                            list.forEach(item => {
                                 let url = ""
                                 data.results.forEach (data => {
                                    if (data.name == item.value){
                                        url = data.url
                                    }
                                })
                                currentList[i] = {"name":item.value, "url": url};
                                i++ 
                             } );
                            console.log(currentList);
                            const string = JSON.stringify(currentList);
                            console.log(string);
                            localStorage.setItem("pokemon", string);
                            console.log(localStorage);
                        })
                        
                }

                function back() {
                    const backBtn = document.querySelector("#backBtn");

                    // backBtn.addEventListener("click", homeView);
                }
            }

        } // Ends getAllPokemon()

        getAllPokemon();
        // console.log(jsonPokemon)
    }
}


