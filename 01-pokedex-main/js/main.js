/**
 * Proyecto     : Pokédex API
 * Fecha        : 2/11/2023
 * Programador  : Luigui P.
 * Fuente       : Carpi Coder
 * Descripción  :
 *                  - Maquetación de la estructura con HTML 5.
 *                  - Inserción de estilos usando CSS 3.
 *                  - Obtención de datos usando JS y PokeAPI.
 *                  - Renderizar información e imágenes de los Pokémons.
 *                  - Utilizamos conceptos de JS para la solución del caso.
 */

// GET Elments from HTML body
const pokemonList = document.querySelector("#listaPokemon");
const filterBtns = document.querySelectorAll(".btn-header");

// API URL
let URL = "https://pokeapi.co/api/v2/pokemon/";

// Get first 151 Pokemon's URL
for (let index = 1; index <= 151; index++) {
  fetch(URL + index)
    .then((response) => response.json())
    .then((data) => showPokemon(data));
}

// showPokemon function
function showPokemon(pokemon) {
  // Data declaration
  let sprite = pokemon.sprites.other["official-artwork"].front_default;
  let altText = pokemon.name;
  let id = pokemon.id.toString();
  let name = pokemon.name;
  let types = pokemon.types.map(
    (type) => `<p class="${type.type.name} tipo">${type.type.name}</p>`
  );
  types = types.join("");
  // console.log(tipos);
  let mainStats = pokemon.stats.map(
    (stat) =>    
      `<span class="unique-stat">${stat.stat.name.toUpperCase()}:</span>
      <p class="stat main-stat"
      "><span class="maint-stat-lvl ${stat.stat.name}" style="width:${
        (stat.base_stat / 180) * 100 + "%"
      }">${stat.base_stat}</span></p>`
  );
  mainStats = mainStats.join("");
  // console.log(mainStats);

  // Data manipulation
  altText[0].toUpperCase() + altText.slice(1); // Capitalize first letter
  if (id.length === 1) {
    id = "00" + id;
  } else if (id.length === 2) {
    id = "0" + id;
  }

  // Needed elements creation
  const div = document.createElement("div");
  div.classList.add("pokemon");
  div.innerHTML = `
        <p class="pokemon-id-back">#025</p>
        <div class="pokemon-imagen">
          <img
            src="${sprite}"
            alt="Pokemon ${altText} get from Pokemon API"
          />
        </div>
        <div class="pokemon-info">
          <div class="nombre-contenedor">
            <p class="pokemon-id">#${id}</p>
            <h2 class="pokemon-nombre">${name}</h2>
          </div>
          <div class="pokemon-tipos">
            ${types}
          </div>
          <div class="pokemon-stats">
            ${mainStats}          
          </div>
        `;
  pokemonList.append(div);
}

// Filter component
filterBtns.forEach((btn) =>
  btn.addEventListener("click", (event) => {
    const btnId = event.currentTarget.id; // Get id of every type
    pokemonList.innerHTML = ""; // Clean HTML body everytime with click

    for (let index = 1; index <= 151; index++) {
      fetch(URL + index)
        .then((response) => response.json())
        .then((data) => {
          if (btnId === "ver-todos") {
            showPokemon(data);
          } else {
            const types = data.types.map((type) => type.type.name);
            // console.log(types);
            if (types.some((type) => type.includes(btnId))) {
              showPokemon(data);
            }
          }
        });
    }
  })
);
