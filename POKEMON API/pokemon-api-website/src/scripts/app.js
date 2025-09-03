const apiUrl = 'https://pokeapi.co/api/v2/pokemon?limit=50'; // Limit to 50 for demo

document.addEventListener('DOMContentLoaded', () => {
    fetchPokemons();
});

async function fetchPokemons() {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        const pokemonDetails = await Promise.all(
            data.results.map(pokemon => fetch(pokemon.url).then(res => res.json()))
        );
        displayPokemons(pokemonDetails);
    } catch (error) {
        console.error('Error fetching Pokémon data:', error);
    }
}

function displayPokemons(pokemons) {
    const pokemonContainer = document.getElementById('pokemon-container');
    pokemonContainer.innerHTML = '';

    pokemons.forEach(pokemon => {
        const types = pokemon.types.map(t => t.type.name).join(', ');
        const pokemonCard = document.createElement('div');
        pokemonCard.classList.add('pokemon-card');
        pokemonCard.innerHTML = `
            <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}" />
            <h3>${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h3>
            <p><strong>Type:</strong> ${types}</p>
            <p><strong>ID:</strong> ${pokemon.id}</p>
        `;
        pokemonContainer.appendChild(pokemonCard);
    });
}