const searchContent = document.querySelector(".buscar");
const inputBox = searchContent.querySelector("input");
const sugBox = searchContent.querySelector("ul.autocomplete");
const icon = searchContent.querySelector(".icon");

// Usamos un array de objetos
const suggestions = [
  { title: "Anarrancherita", url: "CuecasP/Anarrancherita.html" },
  { title: "Atrapadorita", url: "CuecasP/Atrapadorita.html" },
  { title: "Calzon de seda", url: "CuecasP/Calzon_de_seda.html" },
  { title: "Chola bandida", url: "CuecasP/Chola_bandida.html" },
  { title: "Claveles Rojos", url: "CuecasP/Claveles_rojos.html" },
  { title: "Pajarillo", url: "CuecasP/Pajarillo.html" },
  { title: "Viva mi patria Bolivia", url: "CuecasP/Viva_mi_patria_Bolivia.html" },
];

// Esta es la función principal que se ejecutará en cada pulsación de tecla
function performSearch() {
  let userData = inputBox.value.trim(); // Obtenemos el valor del input y eliminamos espacios en blanco
  let emptyArray = [];

  if (userData) {
    // Filtramos el array de sugerencias
    emptyArray = suggestions.filter((data) => {
      // Compara el título en minúsculas con el valor del input en minúsculas
      return data.title.toLocaleLowerCase().includes(userData.toLocaleLowerCase());
    });

    // Mapeamos los resultados a un array de elementos <li> con enlaces <a>
    emptyArray = emptyArray.map((data) => {
      // Usamos template literals para crear el HTML
      return `<li><a href="${data.url}">${data.title}</a></li>`;
    });

    // Añade la clase 'active' al contenedor de búsqueda para mostrar el autocomplete
    searchContent.classList.add("active");
    // Muestra las sugerencias en la lista ul
    showSuggestions(emptyArray);
  } else {
    // Si el input está vacío, quita la clase 'active' y esconde las sugerencias
    searchContent.classList.remove("active");
    // Llama a showSuggestions con un array vacío para borrar la lista
    showSuggestions([]);
  }
}

// Llama a performSearch cada vez que una tecla se suelta
inputBox.onkeyup = () => {
    performSearch();
};

// No necesitas onkeydown si ya usas onkeyup, pero puedes mantenerlo si lo deseas
inputBox.onkeydown = (e) => {
  if (e.key === "Enter") {
    // Si el usuario presiona Enter, puedes navegar al primer resultado, por ejemplo
    // o simplemente no hacer nada y dejar que el onkeyup actúe
    // Puedes agregar una redirección aquí si quieres.
    performSearch();
  }
};

// Esta función muestra los resultados en el `<ul>`
function showSuggestions(list) {
  let listData;
  if (!list.length) {
    // Si la lista está vacía, muestra "No se encontraron resultados"
    listData = `<li>No se encontraron resultados</li>`;
  } else {
    // Junta todos los elementos del array en una sola cadena de HTML
    listData = list.join('');
  }
  sugBox.innerHTML = listData; // Inserta el HTML en la lista de sugerencias
}

