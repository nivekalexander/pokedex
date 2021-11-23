


//gracias a las nuevas politicas de los navegadores ya no es posible autoreproducir 
//un audio sin previa interaccion con la pagina , para eso el listerning click
(function(){
    document.addEventListener("click",function(){
        document.getElementById("music").play();
    });
    
    pokemonDataApi(Math.floor(Math.random() * (151 - 1 + 1) + 1));

}());
function searchPokemon(){
    let search=document.getElementById("search").value;
    document.getElementById("search").value="";
    pokemonDataApi(search.toLowerCase())
}
function selectPokemon(num){
    let select=document.getElementById("pokemon-item-"+num).value;
    pokemonDataApi(select);
}
async function pokemonDataApi(search){
    const HTMLPokemonElement= document.getElementById("element");
    const HTMLPokemonMain = document.getElementById("pokemonMain");
    const HTMLPokemonTitle=document.getElementById("main-title");
    const HTMLPokemonStatistic=document.getElementById("main-statistic");
    const other = document.getElementById("others");
    let name="";

    fetch(`https://pokeapi.co/api/v2/pokemon/${search}`)
    .then(function(response){
        response.json()
        .then(function (pokemon){ 
            HTMLPokemonTitle.innerHTML=`${pokemon.name[0].toUpperCase()+ pokemon.name.slice(1)}`;
            HTMLPokemonElement.innerHTML="";
            HTMLPokemonMain.src=`https://professorlotus.com/Sprites/${pokemon.name}.gif`;
            for (let index = 0; index < pokemon.types.length; index++) {
                HTMLPokemonElement.innerHTML+=`<img  class="iconElement" src="./media/${pokemon.types[index].type.name}.png" alt="element">`;    
            }

            HTMLPokemonStatistic.innerHTML=`
            <div class="num-pokemon">
                <p>No.</p>
                <p>${pokemon.id}</p>
            </div>
            <div class="level-pokemon">
                <p>Level</p>
                <p>${pokemon.base_experience}</p>
            </div>
            <div class="type-pokemon">
                <p>Type</p>
                <p>${pokemon.types[0].type.name[0].toUpperCase()+ pokemon.types[0].type.name.slice(1)}</p>
            </div>
            <div class="hability-pokemon">
                <p>Hability</p>
                <p>${pokemon.abilities[0].ability.name[0].toUpperCase() + pokemon.abilities[0].ability.name.slice(1)}</p>
            </div>
            <div class="height-pokemon">
                <p>Height</p>
                <p>${pokemon.height} m</p>
            </div>
            <div class="weight-pokemon">
                <p>Weight</p>
                <p>${pokemon.weight} Kg</p>
            </div>`
        }).catch((error) => {
            window.alert("No pudimos encontrar ese pokemon :c")
          })
    }).catch((error) => {
        window.alert("No pudimos encontrar ese pokemon :c")
      });

    const other1Number = Math.floor(Math.random() * (38 - 1 + 1) + 1);
    const other2Number = Math.floor(Math.random() * (75 - 38 + 1) + 38);
    const other3Number = Math.floor(Math.random() * (112 - 75 + 1) + 75);
    const other4Number = Math.floor(Math.random() * (151 - 112 + 1) + 112);

    // Validate unique Numbers

    other.innerHTML =`
    <button onclick="selectPokemon('1')" src="" id="pokemon-item-1" class="pokemon-item" value=${other1Number}>
    <img id="pokemon-img-1" src="${await searchRandom(other1Number)}" alt="pokemonImg">              
    </button>
    <button onclick="selectPokemon('2')" src="" id="pokemon-item-2" class="pokemon-item" value=${other2Number}>  
    <img id="pokemon-img-2" src="${await searchRandom(other2Number)}" alt="pokemonImg"> 
    </button>
    <button onclick="selectPokemon('3')" src="" id="pokemon-item-3" class="pokemon-item" value=${other3Number}>
    <img id="pokemon-img-3" src="${await searchRandom(other3Number)}" alt="pokemonImg"> 
    </button>
    <button onclick="selectPokemon('4')" src="" id="pokemon-item-4" class="pokemon-item" value=${other4Number}>
    <img id="pokemon-img-4" src="${await searchRandom(other4Number)}" alt="pokemonImg">
    </button> `;
}

async function searchRandom(num){
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${num}`);
    const responseJson = await response.json();
    const namePokemon = await responseJson.name;
    return `https://professorlotus.com/Sprites/${namePokemon}.gif`;
}
