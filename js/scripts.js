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

  // Pokemon Loop and write the output to HTML
  // Highlight special Pokemons by size

  for (let i=0; i < pokemonList.length; i++){
    if (pokemonList[i].weight > 500 && pokemonList[i].weight < 1000) {
      document.write(`${(pokemonList[i].name)} - Height: ${pokemonList[i].height}cm Weight: ${pokemonList[i].weight} lbs  <br/><br/><strong> THIS IS A HEAVY POKEMON!!!</strong> </span><br/> <br/>`);
    } else if (pokemonList[i].weight > 1000) {
      document.write(`${(pokemonList[i].name)} - Height: ${pokemonList[i].height}cm Weight: ${pokemonList[i].weight} lbs  <br/><br/><strong>THIS IS THE HEAVIEST POKEMON!!! </strong><br/> <br/>`);
    } else {
      document.write(`${(pokemonList[i].name)} - Height: ${pokemonList[i].height}cm Weight: ${pokemonList[i].weight} lbs <br/> <br/>`);
    }
  };
