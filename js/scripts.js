// Pokemon list from API

let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  //  add pokemon to list

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

  // Modal window function

  function showModal() {
    let modalContainer = document.querySelector('#modal-container');
    modalContainer.classList.add('is-visible');
  }

  document.querySelector('#show-modal').addEventListener('click', () => {
    showModal();
  });

  function showModal(title, text) {
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
    contentElement.innerText = text;

    modal.appendChild(closeButtonElement);
    modal.appendChild(titleElement);
    modal.appendChild(contentElement);
    modalContainer.appendChild(modal);

    modalContainer.classList.add('is-visible');
  }


  window.addEventListener('keydown', (e) => {
    let modalContainer = document.querySelector('#modal-container');
    if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
      hideModal();
    }
    modalContainer.addEventListener('click', (e) => {
      // Since this is also triggered when clicking INSIDE the modal
      // We only want to close if the user clicks directly on the overlay
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

  // Create and display clickable pokemon objects

  function addListItem(pokemon){
    let pokemonList = document.querySelector(".pokemon-list");
    let listpokemon = document.createElement("card");
    let button = document.createElement("button");
    button.innerText = pokemon.name;
    button.classList.add("button-class");
    button.setAttribute('data-bs-target', '#modal-container');
    button.setAttribute('data-bs-toggle', 'modal');
    listpokemon.appendChild(button);
    pokemonList.appendChild(listpokemon);


    button.addEventListener("click", function(event){
      showDetails(pokemon);
    });
  }

  // Show details Pokemon

  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      modalContainer.innerHTML = '';

      let modal = document.createElement('div');
      modal.classList.add('modal');
      // Pokémon Image
      let pkmImg = document.createElement('img');
      pkmImg.src = pokemon.imageUrl;
      pkmImg.alt = pokemon.name;

      // Pokémon ID + Name
      let pkmIdName = document.createElement('h1');
      let pkmId =
        pokemon.id < 10
          ? `#00${pokemon.id} ${pokemon.name}`
          : pokemon.id >= 10 && pokemon.id < 100
          ? `#0${pokemon.id} ${pokemon.name}`
          : `#${pokemon.id} ${pokemon.name}`;
      pkmIdName.innerText = pkmId;

      // Pokémon Weight
      let pkmWeight = document.createElement('p');
      pkmWeight.innerText = `Weight: ${pokemon.weight} kg`;

      // Append
      modal.append(
        closeButtonElement,
        pkmImg,
        pkmIdName,
        pkmHeight,
        pkmWeight
      );
      modalContainer.appendChild(modal);

      modalContainer.classList.add('is-visible');

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

  // Event listener for showDetails

  function showDetails(pokemon) {
    pokemonRepository.loadDetails(pokemon).then(function () {
      showModal(pokemon);
    });
  }

  // Opens modal with pokemon info

    function showDetails(pokemon) {
      loadDetails(pokemon).then(function () {
        showModal(pokemon);
      });
    }


  // load details from PokeApi
  function loadDetails(pokemon) {
    let url = pokemon.detailsUrl;
    return fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(function (details) {
        pokemon.imageUrl = details.sprites.front_default;
        pokemon.height = details.height;
        pokemon.types = details.types;
      })
      .catch(function (e) {
        console.error(e);
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
