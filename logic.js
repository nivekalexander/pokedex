


//gracias a las nuevas politicas de los navegadores ya no es posible autoreproducir 
//un audio sin previa interaccion con la pagina , para eso el listerning click
(function(){
    let music=document.getElementById("music");
    music.volume=0.04;
    document.addEventListener("click",function(){
        
        music.play();
         
        console.log(music.volume);
    });
    
    pokemonDataApi(Math.floor(Math.random() * (492 - 1 + 1) + 1));

}());
function searchPokemon(){
    let search=document.getElementById("search").value;
    var valoresAceptados = /^[0-9]+$/;
    document.getElementById("search").value="";
    if(parseInt(search)<493 || !search.match(valoresAceptados)){
        
        pokemonDataApi(search.toLowerCase())
    }else{
        window.alert("¡Ups!, aún no has registrado este pokemón");
    }
    
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
    

    fetch(`https://pokeapi.co/api/v2/pokemon/${search}`)
    .then(function(response){
        response.json()
        .then(function (pokemon){ 
            if(pokemon.id<493){
                HTMLPokemonTitle.innerHTML=`${pokemon.name[0].toUpperCase()+ pokemon.name.slice(1)}`;
                HTMLPokemonElement.innerHTML="";
                HTMLPokemonMain.src=`https://professorlotus.com/Sprites/${pokemon.name}.gif`;
                HTMLPokemonMain.onerror = function () {
                    this.setAttribute('src', './media/desconocido.svg');
                }
                for (let index = 0; index < pokemon.types.length; index++) {
                    HTMLPokemonElement.innerHTML+=`<img  class="iconElement" src="./media/${pokemon.types[index].type.name}.png" alt="element">`;    
                }

                HTMLPokemonStatistic.innerHTML=`
                <div class="num-pokemon">
                    <p><b>No.</b></p>
                    <p>${pokemon.id}</b></p>
                </div>
                <div class="level-pokemon">
                    <p><b>Level</b></p>
                    <p>${pokemon.base_experience}</p>
                </div>
                <div class="type-pokemon">
                    <p><b>Type</b></p>
                    <p>${pokemon.types[0].type.name[0].toUpperCase()+ pokemon.types[0].type.name.slice(1)}</p>
                </div>
                <div class="hability-pokemon">
                    <p><b>Hability</b></p>
                    <p>${pokemon.abilities[0].ability.name[0].toUpperCase() + pokemon.abilities[0].ability.name.slice(1)}</p>
                </div>
                <div class="height-pokemon">
                    <p><b>Height</b></p>
                    <p>${pokemon.height} m</p>
                </div>
                <div class="weight-pokemon">
                    <p><b>Weight</b></p>
                    <p>${pokemon.weight} Kg</p>
                </div>`
            }else{
                window.alert("¡Ups!, aún no has registrado este pokemón");
            }        
        }).catch((error) => {
            window.alert("No pudimos encontrar ese pokemon :c")
          })
    }).catch((error) => {
        window.alert("No pudimos encontrar ese pokemon :c")
      });

    const other1Number = Math.floor(Math.random() * (123 - 1 + 1) + 1);
    const other2Number = Math.floor(Math.random() * (246 - 123 + 1) + 123);
    const other3Number = Math.floor(Math.random() * (369 - 246 + 1) + 246);
    const other4Number = Math.floor(Math.random() * (492 - 369 + 1) + 369);

    // Validate unique Numbers

    other.innerHTML =`
    <button onclick="selectPokemon('1')" src="" id="pokemon-item-1" class="pokemon-item" value=${other1Number}>
    <img id="pokemon-img-1" src="${await searchRandom(other1Number)}" alt="pokemonImg" onerror="this.onerror=null;this.src='./media/desconocido.svg';">              
    </button>
    <button onclick="selectPokemon('2')" src="" id="pokemon-item-2" class="pokemon-item" value=${other2Number}>  
    <img id="pokemon-img-2" src="${await searchRandom(other2Number)}" alt="pokemonImg" onerror="this.onerror=null;this.src='./media/desconocido.svg';"> 
    </button>
    <button onclick="selectPokemon('3')" src="" id="pokemon-item-3" class="pokemon-item" value=${other3Number}>
    <img id="pokemon-img-3" src="${await searchRandom(other3Number)}" alt="pokemonImg" onerror="this.onerror=null;this.src='./media/desconocido.svg';"> 
    </button>
    <button onclick="selectPokemon('4')" src="" id="pokemon-item-4" class="pokemon-item" value=${other4Number}>
    <img id="pokemon-img-4" src="${await searchRandom(other4Number)}" alt="pokemonImg" onerror="this.onerror=null;this.src='./media/desconocido.svg';">
    </button> `;
}

async function searchRandom(num){
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${num}`);
    const responseJson = await response.json();
    const namePokemon = await responseJson.name;
    return `https://professorlotus.com/Sprites/${namePokemon}.gif`;
}
