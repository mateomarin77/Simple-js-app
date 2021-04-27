// Pokemon list from API
let pokemonRepository = (function() {
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
    button.addEventListener('click', function() {
      showDetails(pokemon);
    });
  }

  // Create and display clickable pokemon objects
  function addListItem(pokemon) {
    let pokemonList = document.querySelector('.list-group');
    let listpokemon = document.createElement('card');
    // listpokemon.classList.add('list-group-item');
    // listpokemon.classList.add('list-group-item-action');

    // Display pokemon in button
    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('btn');
    button.classList.add('btn-outline-primary');
    button.setAttribute('data-target', '#pokemonModal');
    button.setAttribute('data-toggle', 'modal');
    button.type = 'button';
    listpokemon.appendChild(button);
    pokemonList.appendChild(listpokemon);

    // Add event listener to button

    button.addEventListener('click', function(event) {
      showDetails(pokemon);
    });
  }

  // Bootstrap Modal

  function showDetails(pokemon) {
    loadDetails(pokemon).then(function() {
      let modalBody = $('.modal-body');
      let modalTitle = $('.modal-title');
      let modalHeader = $('.modal-header');

      modalTitle.empty();
      modalBody.empty();

      let pokemonName = $('<h1>' + pokemon.name + '</h1>');
      let pokemonImage = $('<img class="modal-img" style="width:50%">');
      pokemonImage.attr('src', pokemon.imageUrl);
      let pokemonHeight = $('<p>' + 'Height: ' + pokemon.height + '</p>');

      modalTitle.append(pokemonName);
      modalBody.append(pokemonImage);
      modalBody.append(pokemonHeight);
    });
  }

  // Modal window function

  function showModal(title, text, weight, url) {
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
    contentElement.innerText = 'Type: ' + text;
    let pokemonWeight = document.createElement('p');
    pokemonWeight.innerText = 'Weight: ' + weight + 'Kg';

    let modalImage = document.createElement('img');
    modalImage.src = url;
    modalImage.setAttribute('id', 'pokemonImage');

    modal.appendChild(closeButtonElement);
    modal.appendChild(titleElement);
    modal.appendChild(contentElement);
    modal.appendChild(pokemonWeight);
    modal.appendChild(modalImage);
    modalContainer.appendChild(modal);

    modalContainer.classList.add('is-visible');
  }

  // PROMISE FETCH function

  function loadList() {
    return fetch(apiUrl)
      .then(function(response) {
        return response.json();
      })
      .then(function(json) {
        json.results.forEach(function(item) {
          let pokemon = {
            name: item.name,
            detailsUrl: item.url
          };
          add(pokemon);
          console.log(pokemon);
        });
      })
      .catch(function(e) {
        console.error(e);
      });
  }

  // loadDetails function

  function loadDetails(item) {
    let url = item.detailsUrl;

    return fetch(url)
      .then(function(response) {
        return response.json();
      })
      .then(function(details) {
        // Now we add the details to the item
        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
        item.weight = details.weight;
        item.type = details.types[0].type.name;
      })
      .catch(function(e) {
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

pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
