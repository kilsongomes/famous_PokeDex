import Pokemon from "./pokemon-model.js"

const pokeApi = {}

pokeApi.pokemonsDetails = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then((details) => pokemonModel(details))
}

pokeApi.getPokemons = (limit = 5, offset = 0) => {
    const URL = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`

    return fetch(URL)
        .then((response) => response.json())
        .then((bodyJson) => bodyJson.results)
        .then((pokemons) => pokemons.map(pokeApi.pokemonsDetails))
        .then((promiseArray) => Promise.all(promiseArray))
        .then((pokemonsDetails) => pokemonsDetails)
        .catch((err) => { console.log(result) })
}

function pokemonModel(details){
    const pokemon = new Pokemon();
    pokemon.name = details.name;
    pokemon.image = details.sprites.other.dream_world.front_default;
    pokemon.number = details.id;
    pokemon.types = details.types.map((slot)=>slot.type.name);
    pokemon.type = details.types[0].type.name;

    return pokemon;
}

export default pokeApi;

