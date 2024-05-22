import pokeApi from "./poke-api.js"

console.log(pokeApi)


var limit = 10;
var offset  = 0;
const pokeList = document.getElementById("pokeList")
const btnMore = document.getElementById("btnMore")

loadMore();
btnMore.addEventListener("click",(evt)=>{
  offset+=limit;
  loadMore();
  if(offset === 630){
    evt.currentTarget.style.display = "none";
  }
})


function loadMore(){
  pokeApi.getPokemons(limit,offset).then((results) => { pokeList.innerHTML += converctionToHTML(results) })
}

function converctionToHTML(poke_array) {
  console.log(poke_array);
  let listPokeHTML = [];
  let elementHTML;
  poke_array.map((pokemon) => {
    console.log(pokemon)
    listPokeHTML.push(`
        <li class="pokemon ${pokemon.type}">
        <span id="numberPoke">#${pokemon.number > 9 ? pokemon.number : '0' + pokemon.number}</span>
        <span class="namePoke"> ${pokemon.name}</span>
        <div class="containerFeature">
          <ol class="types">
           ${pokemon.types.map((name)=>`<li class="type ${name}">${name}</li>`).join('')}
          </ol>
          <img src=${pokemon.image}
           alt = ${pokemon.name}/>
        </div>
        </li>`)
  })
  elementHTML = listPokeHTML.join(' ')
  return elementHTML;
}


