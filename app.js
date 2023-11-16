const raiz = document.getElementById("raiz");
const totalPersonajes = document.getElementById("total-personajes");
let pagina = 1;
let total = 0;

//Filtros
const todos = document.getElementById("todos");
const mujeres = document.getElementById("mujeres");
const hombres = document.getElementById("hombres");
const sinGenero = document.getElementById("sinGenero");
const noSeSabe = document.getElementById("noSeSabe");

//Paginado

const paginaActual = document.getElementById("pagina-actual");
const proximaPagina = document.getElementById("next-page");
const prevPagina = document.getElementById("prev-page");
const totalPaginas = document.getElementById("total-paginas");
const primerPagina = document.getElementById("first-page");
const ultimaPagina = document.getElementById("last-page");

//Le estabamos pasando "Página como argumento de manera incorrecta"
const getData = async () => {
  const URL = `https://rickandmortyapi.com/api/character?page=${pagina}`;
  const response = await fetch(URL);
  const json = await response.json();
  total = json.info.pages;
  paginaActual.innerHTML = pagina;
  totalPaginas.innerHTML = total;
  printData(json.results);
  updatePagination();
  data = json;
  return json;
};
getData(pagina);
let data = {};

const printData = (arr) => {
  let card = "";
  totalPersonajes.innerHTML = arr.length;
  arr.forEach((personaje) => {
    card =
      card +
      `
      <div class="card-conteiner">
        <div class="card">
            <div class="card-image">
                <img src=${personaje.image} alt="">
            </div>
            <div class="card-content">
                <p><b>Nombre:</b>${personaje.name}</p>
                <p><b>Genero:</b>${personaje.gender === "Female" ? "Mujer" : "" || personaje.gender === "Male" ? "Hombre" : "" || personaje.gender === "unknown" ? "Desconocido" : "" || personaje.gender === "Genderless" ? "Sin género" : ""}</p>
                <p><b>Especies:</b>${personaje.species}</p>
                <p><b>Estado:</b>${personaje.status === "Alive" ? "Vivo" : "" || personaje.status === "Dead" ? "Muerto" : "" || personaje.status === "unknown" ? "Desconocido" : ""}</p>
                <p><b>Origen:</b>${personaje.origin.name}</p>
                <p><b>Locacion:</b>${personaje.location.name}</p>   
            </div>
            <div class="ver-mas">
            <hr><a href="https://rickandmortyapi.com/api/character/${personaje.id}" target="_blank"> 
              Ver Más...</a>
            </div>
        </div>
    </div>
    `;
  });
  raiz.innerHTML = card;
};

const pagination = async (prom) => {
  const result = await prom;
  proximaPagina.addEventListener("click", () => {
    pagina += 1;
    getData();
  });

  prevPagina.addEventListener("click", () => {
    pagina -= 1;
    getData();
  });

  primerPagina.addEventListener("click", () => {
    if (pagina >= 2) {
      pagina = 1;
      getData();
    }
  });
  ultimaPagina.addEventListener("click", () => {
    if (pagina < result.info.pages) {
      pagina = result.info.pages;
      getData();
    }
  });
};

const updatePagination = () => {
  if (pagina <= 1) {
    prevPagina.disabled = true;
    primerPagina.disabled = true;
    prevPagina.style.backgroundColor = "grey"
    primerPagina.style.backgroundColor = "grey"
  } else {
    prevPagina.disabled = false;
    primerPagina.disabled = false;
    prevPagina.style.backgroundColor = "#f75402"
    primerPagina.style.backgroundColor = "#f75402"
  }

  if (pagina === total) {
    ultimaPagina.disabled = true;
    proximaPagina.disabled = true;
    ultimaPagina.style.backgroundColor = "grey"
    proximaPagina.style.backgroundColor = "grey"

  } else {
    ultimaPagina.disabled = false;
    proximaPagina.disabled = false;
    ultimaPagina.style.backgroundColor = "#f75402"
    proximaPagina.style.backgroundColor = "#f75402"
  }
};

//Filtros
mujeres.addEventListener("click", () => {
  const arr = data.results;
  const arrMujeres = [];

  for (let i = 0; i < arr.length; i++) {
    if (arr[i].gender === "Female") {
      arrMujeres.push(arr[i]);
    }
  }

  printData(arrMujeres);
});

hombres.addEventListener("click", () => {
  const arr = data.results;
  const arrHombres = [];

  for (let i = 0; i < arr.length; i++) {
    if (arr[i].gender === "Male") {
      arrHombres.push(arr[i]);
    }
  }
  printData(arrHombres);
});
//Primero: Elemento html
//.addEventListener("evento", ()=>{})
sinGenero.addEventListener("click", () => {
  const arr = data.results;
  const arrSinGenero = [];

  for (let i = 0; i < arr.length; i++) {
    if (arr[i].gender === "Genderless") {
      arrSinGenero.push(arr[i]);
    }
  }
  printData(arrSinGenero);
  console.log(arr);
});

noSeSabe.addEventListener("click", () => {
  const arr = data.results;
  const arrNoSeSabe = [];

  for (let i = 0; i < arr.length; i++) {
    if (arr[i].gender === "unknown") {
      arrNoSeSabe.push(arr[i]);
    }
  }
  printData(arrNoSeSabe);
});

todos.addEventListener("click", () => {
  const arr = data.results;
  printData(arr);
});

pagination(getData());
