export default class Views{
    constructor (){
        this.url = "https://pokeapi.co/api/v2/pokemon";
        this.offset = 0;
        this.code = 2;
    }

    initialView() {
        // draws the home page
        document.body.innerHTML = 
        `<h1>Pokemon Team</h1>
        <ul id="mainTeam">
            <li class="blackBorder active">Pokemon 1</li>
            <li class="blackBorder">Pokemon 2</li>
            <li class="blackBorder">Pokemon 3</li>
            <li class="blackBorder">Pokemon 4</li>
            <li class="blackBorder">Pokemon 5</li>
            <li class="blackBorder">Pokemon 6</li>
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

    }

    formView() {
        document.body.innerHTML =
        `<form>
        <label for="teamName">Team Name</label>
        <input type="text" name="teamName" required>`
    }
}