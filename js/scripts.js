  // Pokemon List Variable

  let pokemonList = [{
      name: 'Magnemite',
      height: '0.3',
      type: ['electric', 'steel'],
      weight: ['20'],
    },
    {
      name: 'Squirtle',
      height: '1.5',
      type: ['water', 'poison'],
      weight: ['50'],
    },
    {
      name: 'Blastoise',
      height: '1.6',
      type: ['water', 'poison'],
      weight: ['12'],
    },
    {
      name: 'Charmander',
      height: '0.6',
      type: ['fire'],
      weight: ['1020'],
    },
    {
      name: 'Charmeleon',
      height: '1.1',
      type: ['fire'],
      weight: ['40'],
    },
    {
      name: 'Charizard',
      height: '1.7',
      type: ['fire'],
      weight: ['520'],
    },

  ]

  //IIFE pokemonRepository

  let pokemonRepository = (function () {
   return {
      add: function(pokemon) {
        pokemonList.push(pokemon);
      },
      getAll: function() {
        return pokemonList;
      }
    };
  })();

  // Pokemon Loop using forEach and write the output to HTML
  // Highlight special Pokemons by size

  pokemonList.forEach(function(pokemon) {
  if (pokemon.weight > 500 && pokemon.weight < 1000) {
    document.write(`${(pokemon.name)} - Height: ${pokemon.height}cm - Weight: ${pokemon.weight} lbs - Now that is heavy! <br/> <br/>`);
  } else if (pokemon.weight > 1000) {
    document.write(`${(pokemon.name)} - Height: ${pokemon.height}cm - Weight: ${pokemon.weight} lbs - Whoa IT'S HUGE!!! <br/> <br/>`);
  } else {
    document.write(`${(pokemon.name)} - Height: ${pokemon.height}cm - Weight: ${pokemon.weight} lbs <br/> <br/>`);
  }
});
