// Pokemon list from API

let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';


  // function add pokemon

  function add(pokemon) {
    if (
      typeof pokemon === "object" &&
      "name" in pokemon
    ) {
      pokemonList.push(pokemon);
    } else {
      console.log("pokemon is not correct");
    }
  }
  function getAll() {
    return pokemonList;
  }

  // Add buttons and Style + Event listener

  function addListItem(pokemon){
    let pokemonList = document.querySelector(".pokemon-list");
    let listpokemon = document.createElement("card");
    let button = document.createElement("button");
    button.innerText = pokemon.name;
    button.classList.add("button-class");
    listpokemon.appendChild(button);
    pokemonList.appendChild(listpokemon);
    button.addEventListener("click", function(event){
      showDetails(pokemon);
    });
  }

  // PROMISE FETCH function

  function loadList() {
    return fetch(apiUrl).then(function (response) {
      return response.json();
    }).then(function (json) {
      json.results.forEach(function (item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
        console.log(pokemon);
      });
    }).catch(function (e) {
      console.error(e);
    })
  }

  // loadDetails fuction

  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      // Now we add the details to the item
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = details.types;
    }).catch(function (e) {
      console.error(e);
    });
  }

  //showDetails

  function showDetails(item) {
    pokemonRepository.loadDetails(item).then(function () {
      console.log(item);
    });
  }


  // key variable to access the IIEF

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails
  };
})();

pokemonRepository.add({ name: "Pikachu", height: 0.3, types: ["electric"]

});

// users input and display pokemon on screen
function getPokemon(){
  let newPokemon = document.getElementById("newPokemon").value;
  let result = document.getElementById("result");
  let newPokemonHeight = document.getElementById("newPokemonHeight").value;

  if (newPokemonHeight !== ""){
    newPokemon = [ newPokemon +  " (height: " + newPokemonHeight + ")"]
  }
  else {
    newPokemon = [ newPokemon ]
  }

  pokemonRepository.add(newPokemon)
  if (newPokemonHeight > 5){
    result.textContent = newPokemon + "-Wow that Pokemon is HUGE!"
  } else{
    result.textContent = newPokemon
  }
}

// console.log(pokemonRepository.getAll());

pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
