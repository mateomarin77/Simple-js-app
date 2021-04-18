// Pokemon list from API

let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  //  Add pokemon to list

  function add(pokemon) {
    pokemonList.push(pokemon);
  }

  // Return list of Pokemon
  function getAll() {
    return pokemonList;
  }

  // event listener for showDetails
  function addDetailsListener(button, pokemon) {
    button.addEventListener('click', function () {
      showDetails(pokemon);
    });
  }

  // Create and display clickable pokemon objects

  function addListItem(pokemon){
    let pokemonList = document.querySelector(".pokemon-list");
    let listpokemon = document.createElement("li");
    listpokemon.classList.add('group-list-item');
    listpokemon.classList.add('col-12');
    listpokemon.classList.add('col-md-8');



    // Display pokemon in button

    let button = document.createElement("button");
    button.innerText = pokemon.name;

    button.classList.add('btn');
    button.classList.add('btn-light');
    button.classList.add('col');
    button.setAttribute('data-bs-target', '#modal-container');
    button.setAttribute('data-bs-toggle', 'modal');
    button.type = 'button';

    listpokemon.appendChild(button);
    pokemonList.appendChild(listpokemon);



    // Add event listener to button

    button.addEventListener("click", function(event) {

      // showDetails(pokemon);

      loadDetails(pokemon).then(function() {
        let pokemonName = pokemon.name;
        let pokemonDesc = pokemon.height;
        let pokemonWeight = pokemon.weight;
        let pokemonUrl = pokemon.imageUrl;
        let pokemonType = pokemon.type;

        showModal(pokemonName, pokemonType, pokemonWeight, pokemonUrl );
      })

    });

  }

  // Modal window function

  document.querySelector('#show-modal').addEventListener('click', () => {
    showModal();
  });

  function showModal(title, text, weight, url ) {
    let modalContainer = document.querySelector('#modal-container');

    // Clear all existing modal content

    modalContainer.innerHTML = '';

    let modal = document.createElement('div');
    modal.classList.add('modal');

    // Add the new modal content

    let closeButtonElement = document.createElement('button');
    closeButtonElement.classList.add('modal-close');
    closeButtonElement.innerText = 'Close';
    closeButtonElement.addEventListener('click', hideModal);

    let titleElement = document.createElement('h1');
    titleElement.innerText = title;

    let contentElement = document.createElement('p');
    contentElement.innerText = "Type: " + text;
    let pokemonWeight = document.createElement("p");
    pokemonWeight.innerText = "Weight: " + weight + "Kg";


    let modalImage = document.createElement("img");
    modalImage.src = url;
    modalImage.setAttribute("id", "pokemonImage");



    modal.appendChild(closeButtonElement);
    modal.appendChild(titleElement);
    modal.appendChild(contentElement);
    modal.appendChild(pokemonWeight);
    modal.appendChild(modalImage);
    modalContainer.appendChild(modal);

    modalContainer.classList.add('is-visible');
  }

  // Close modal

  window.addEventListener('keydown', (e) => {
    let modalContainer = document.querySelector('#modal-container');
    if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
      hideModal();
    }
    modalContainer.addEventListener('click', (e) => {
      let target = e.target;
      if (target === modalContainer) {
        hideModal();
      }
    });

  });


  function hideModal() {
    let modalContainer = document.querySelector('#modal-container');
    modalContainer.classList.remove('is-visible');
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

  // loadDetails function

  function loadDetails(item) {
    let url = item.detailsUrl;

    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      // Now we add the details to the item
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.weight = details.weight;
      item.type = details.types[0].type.name;
    }).catch(function (e) {
      console.error(e);
    });
  }

  // Event listener for showDetails

  function showDetails(pokemon) {
    pokemonRepository.loadDetails(pokemon).then(function () {
      showModal(pokemon);
    });
  }

  // key variable to access the IIEF

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails,
    showModal: showModal
  };
})();


// Users input and display pokemon on screen

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



pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
