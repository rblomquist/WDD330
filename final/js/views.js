export default class Views {
    constructor (){
        this.jsonPokemon = JSON.parse(localStorage.getItem("pokemon"));
    }

    homeView() {
        const team = document.querySelector("#mainTeam")
        const children = Array.from(team.children)
        let index = 1


        children.forEach( child => {

            child.querySelector("h2").innerHTML = this.jsonPokemon[index].name
            getOnePokemon(child, this.jsonPokemon[index].url)
            index++
        })

        async function getOnePokemon(child, url) {
            let response = await fetch(url);
            
            if (response.ok) {
                let data = await response.json();
                child.querySelector("img").setAttribute("src", data.sprites.front_default)
                child.querySelector("img").setAttribute("alt", data.name)

                data.stats.forEach(stat => {

                child.querySelector("p").innerHTML += 
                        `${stat.stat.name} - ${stat.base_stat}<br>`
                })
            }
        }

        let activeCard = document.querySelector(".active")
        let activePokemon = {"name":activeCard.querySelector("h2").textContent}
        let string = JSON.stringify(activePokemon)
        localStorage.setItem("active", string)
        
        children.forEach( child => {child.addEventListener("click", active)})
        
        function active(e) {
            children.forEach( child => {if(child.classList.contains("active")) {
                child.classList.remove("active")}
            e.currentTarget.classList.add("active")})
            
            let activeCard = document.querySelector(".active")
            let activePokemon = {"name":activeCard.querySelector("h2").textContent}
            let string = JSON.stringify(activePokemon)
            localStorage.setItem("active", string)

        }
    }

    formView() {
        document.querySelector("#homeView").classList.add("hidden");
        document.querySelector("#formView").classList.remove("hidden")
        async function getAllPokemon() {
            let response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151");
            
            if (response.ok) {
                let data = await response.json();

                if(localStorage.getItem("pokemon") == null) {

                    let name = "Select Pokemon";
                    buildForm(name)
                    buildForm(name)
                    buildForm(name)
                    buildForm(name)
                    buildForm(name)
                    buildForm(name)
                }
                else {
                    let list = JSON.parse(localStorage.getItem("pokemon"));
                    
                    for (const [key,value] of Object.entries(list)) {
                        let name = value.name
                        buildForm(name)
                    }
                }
                submit()

                function buildForm(name) {

                    let li = document.createElement("li");
                    let form = document.createElement("form");
                    // form.classList.add("blackBorder");
                    
                    let select = document.createElement("select");
                    select.classList.add("selectPokemon")
                    select.innerHTML = `<option>${name}</option>`
                    data.results.forEach (result => {select.innerHTML += `<option name=${result.name} value=${result.name}>${result.name}</option>`})
                                        
                    form.appendChild(select);
                    li.appendChild(form);
                    document.querySelector("#updateForm").appendChild(form);
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
                            const string = JSON.stringify(currentList);
                            localStorage.setItem("pokemon", string);
                        
                            location.reload()
                        })
                }
            }
        } // Ends getAllPokemon()

        getAllPokemon();
    }
}