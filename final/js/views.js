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
        
        children.forEach( child => {child.addEventListener("click", active)})
        
        function active(e) {
            children.forEach( child => {if(child.classList.contains("active")) {
                child.classList.remove("active")}
            e.currentTarget.classList.add("active")})}

    }

    formView() {
        async function getAllPokemon() {
            let response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151");
            
            if (response.ok) {
                let data = await response.json();

                let list = JSON.parse(localStorage.getItem("pokemon"));
                
                for (const [key,value] of Object.entries(list)) {
                    buildForm(value.name)
                }
                submit()

                function buildForm(name) {

                    let li = document.createElement("li");
                    let form = document.createElement("form");
                    form.classList.add("blackBorder");
                    
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