import pokeApi from "./poke-api.js"

var limit = 10;
var offset = 0;
const pokeList = document.getElementById("pokeList")
const btnMore = document.getElementById("btnMore")

loadMore();
btnMore.addEventListener("click", (evt) => {
  offset += limit;
  loadMore();
  if (offset === 630) {
    evt.currentTarget.style.display = "none";
  }
})

function loadMore() {
  pokeApi.getPokemons(limit, offset).then((results) => { 
    createHTML(results);
    sessionStorage.setItem("offset", offset);
    addClick(pokeList.children, offset,results); 
  })
}

function addClick(chidren,offset,poke_array){
  for(let i =offset; i < chidren.length; i++){
    chidren[i].addEventListener("click",(evt)=>{
      let pokemonAtual = poke_array[i > 0 ? i-offset : i]
      sessionStorage.setItem("pokemon", JSON.stringify(pokemonAtual));
      window.location.assign("/Pages/ScreenDetails/screenDetails.html")
    })
  }
}

function createHTML(poke_array) {
  poke_array.map((pokemon) => {
    const li = document.createElement("li");
    li.classList.add("pokemon",pokemon.type);

    const span1 = document.createElement("span");
    span1.id = "numberPoke";
    span1.textContent = `#${pokemon.number > 9 ? pokemon.number : '0' + pokemon.number}`

    const span2= document.createElement("span");
    span2.classList.add("namePoke");
    span2.textContent = pokemon.name;

    const div = document.createElement("div");
    div.classList.add("containerFeature");

    const ol = document.createElement("ol");
    ol.classList.add("types");

    pokemon.types.map((name) => {
      const liType = document.createElement("li");
      liType.classList.add("type",name)
      liType.textContent = name;
      ol.appendChild(liType);
    })

    const img = document.createElement("img")
    img.src = pokemon.image;
    img.alt = pokemon.name;

    li.appendChild(span1)
    li.appendChild(span2)
    li.appendChild(div)
    div.appendChild(ol)
    div.appendChild(img)
    document.getElementById("pokeList").appendChild(li)
  })
}


