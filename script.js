document.getElementById('fetch-button').addEventListener('click', async () => {
    const pokemon = document.getElementById('pokemon-input').value.toLowerCase();
    const pokemonInfo = document.getElementById('pokemon-info');
    const errorMessage = document.getElementById('error-message');

    if (!pokemon) {
        alert('Please enter a Pokémon name!');
        return;
    }

    errorMessage.textContent = ''; // Clear previous error messages

    try {
        const response = await fetch(`https://pokeapi.glitch.me/v1/pokemon/${pokemon}`);
        const data = await response.json();

        if (data.status === 404) {
            errorMessage.textContent = '⚠️ Pokémon not found!';
            pokemonInfo.style.display = 'none';
            return;
        }

        const json = data.data[0];
        document.getElementById('pokemon-name').textContent = json.name;
        document.getElementById('pokemon-sprite').src = json.sprite;
        document.getElementById('pokemon-id').textContent = json.number;
        document.getElementById('pokemon-species').textContent = json.species;
        document.getElementById('pokemon-types').textContent = json.types.join(', ');
        document.getElementById('pokemon-height').textContent = `${json.height} ft`;
        document.getElementById('pokemon-weight').textContent = `${json.weight} lbs`;
        document.getElementById('pokemon-description').textContent = json.description;

        pokemonInfo.style.display = 'block'; // Show Pokémon info
    } catch (error) {
        console.error('Error fetching Pokémon data:', error);
        errorMessage.textContent = '⚠️ An error occurred while fetching Pokémon information. Please try again later.';
        pokemonInfo.style.display = 'none';
    }
});
