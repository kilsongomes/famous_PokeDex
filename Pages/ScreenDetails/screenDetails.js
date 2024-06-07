
const pokemon = JSON.parse(sessionStorage.getItem("pokemon"));
console.log()
document.querySelector(".bi-arrow-left").addEventListener("click",(evt)=>{window.location.assign("/index.html")})
document.getElementById("pokeName").innerHTML = pokemon.name;
document.getElementById("pokeNumber").innerHTML = `#${pokemon.number > 9 ? pokemon.number : '0' + pokemon.number}`
document.getElementById("pokeImg").src = pokemon.image;
document.querySelector(".content").classList.add(pokemon.type)
document.getElementById("types").innerHTML = pokemon.types.map((name)=>`<div class="type ${name}">${name}</div>`).join(" ");
