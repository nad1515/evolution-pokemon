

let datasAxios = await axiosTest();
console.log("Datas via Axios : ", datasAxios);
async function axiosTest () {
    const response = await axios.get("https://pokebuildapi.fr/api/v1/pokemon");
    return response.data;
}

let pokemonType = await axiosTest2();
console.log("Datas via Axios : ", pokemonType);
async function axiosTest2 () {
    const response = await axios.get("https://pokebuildapi.fr/api/v1/types");
    return response.data;
}

let main = document.createElement('main');
document.body.appendChild(main);

let titre = document.createElement('h1');
titre.classList.add('h1');
main.appendChild(titre);
titre.innerText = "INFORMATIONS POKEMON";

let fieldset = document.createElement("fieldset");
 fieldset.setAttribute("id","fieldset");
 main.appendChild(fieldset);
 
let legend = document.createElement("legend");
  legend.classList.add("lagend");
  fieldset.appendChild(legend);
  legend.innerText = "Recherche Pokemon"

  //..............cree le button radio.....
let radio = document.createElement("input");
   radio.type = "radio";
   radio.id = "radioButton";
   radio.name = "pokemonList";
   radio.value = "par-nom"; // valeur du button radio
//    radio.setAttribute("checked", true);
let label = document.createElement("label");
label.setAttribute("for", "radioButton");// il faut avoir les memes name des deux input 
    label.innerText = "par Nom";


let radio2 = document.createElement("input");
    radio2.type = "radio";
    radio2.id = "radioButton2";
    radio2.name = "pokemonList";//.....il faut donner le meme radio.name pour alterner le checked des bouttons
    radio2.value = "par-element" // valeur du button radio
let label2 = document.createElement("label");
label2.setAttribute("id","radiobutton2");
  label2.setAttribute("for", "radioButton2");
  label2.innerText = "par Type";

let form = document.createElement("div");
 form.setAttribute("id","form");
 fieldset.appendChild(form);


    form.appendChild(radio);
    form.appendChild(label);

    form.appendChild(radio2);
    form.appendChild(label2);

// Créez une liste select pour contenir les éléments pokemons
let pokemonList = document.createElement('select'); 
    pokemonList.setAttribute('id', 'pokemonList');            
    fieldset.appendChild(pokemonList);


let contenair = document.createElement("div");
contenair.classList.add("contenair");
main.appendChild(contenair);

let lesStats = document.createElement("table");
contenair.appendChild(lesStats);
let uneLigne = document.createElement("tr");
lesStats.appendChild(uneLigne);
let uneStat = document.createElement("td");
uneStat.classList.add("une-statistique");
uneLigne.appendChild(uneStat);

let image = document.createElement('img');
image.setAttribute('id','pokemon-img');
contenair.appendChild(image);


//         radio = document.querySelector('input[type ="radio"]:chcked');
//    if ( radio) {

document.querySelectorAll("input[type='radio']").forEach(radio => {
    radio.addEventListener("change", (eventChange) => {
        if (eventChange.target.value == "par-nom") {
            console.log("target : ", eventChange.target.value);
            pokemonList.innerHTML = "";
            let optionDefault = document.createElement("option");
            optionDefault.innerText = "--Choix Pokemon--";//....choisir de rien afficher au depart et cest au client de choisir son pokemon.....
            optionDefault.value = "0";
            pokemonList.appendChild(optionDefault);
            datasAxios.forEach(pokemon => {
                console.log("pokemon,", pokemon);
                let option = document.createElement('option');
                option.innerText = pokemon.name;
                option.value = pokemon.name;
                pokemonList.appendChild(option);

            });
        
        } else {
        
            pokemonList.innerHTML = "";
            let optionDefault = document.createElement("option");
            optionDefault.innerText = "--Choix type--";//....choisir de rien afficher au depart et cest au client de choisir son pokemon.....
            optionDefault.value = "0";
            pokemonList.appendChild(optionDefault);
            pokemonType.forEach(type => {
            console.log("pokemontype,", type);
            let option2 = document.createElement('option');
            option2.innerText = type.name;
            option2.value = type.name;
            pokemonList.appendChild(option2);
    });
        }

  })
})
   
    document.querySelector("select").addEventListener("change", () => {
        document.querySelector("table").innerHTML = "";
        let PokemonName = document.querySelector("select").value;
        if (document.querySelector("select").value == "0") {
        document.querySelector(".contenair img").removeAttribute("src");
        } else {
                
               // Trouver le Pokémon sélectionné
        let selectePokemon = datasAxios.find((element) => element.name === PokemonName);
        image.setAttribute("src", selectePokemon.image);
              
                 // Afficher les statistiques
       
        for (let [propriete, valeur] of Object.entries(selectePokemon.stats)) {
        console.log(`${propriete}: ${valeur}`);
        let uneLigne = document.createElement("tr");
        lesStats.appendChild(uneLigne);
        let uneStat = document.createElement("td");
        uneStat.classList.add("une-statistique");
        uneStat.textContent = propriete + " : " + valeur;
        uneLigne.appendChild(uneStat);
         }
        }
    });
       
           


    
   