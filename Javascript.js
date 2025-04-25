document.addEventListener('DOMContentLoaded', function () {
    const menu = document.querySelector('.menu');
    const menuToggle = menu.querySelector('.menu-toggle');
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    const content = document.body;

    // Mostrar/ocultar menú en dispositivos móviles
    menuToggle.addEventListener('click', function () {
        menu.classList.toggle('active');
    });

    // Función para resaltar texto dentro del contenido
    function highlightText(text) {
        // Eliminar resaltados previos
        const highlightedElements = content.querySelectorAll('.highlight');
        highlightedElements.forEach(function (element) {
            const parent = element.parentNode;
            parent.replaceChild(document.createTextNode(element.textContent), element);
            parent.normalize();
        });

        if (text === '') {
            return;
        }

        const regex = new RegExp(`(${text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');

        const walker = document.createTreeWalker(content, NodeFilter.SHOW_TEXT, null, false);
        const textNodes = [];

        while (walker.nextNode()) {
            textNodes.push(walker.currentNode);
        }

        textNodes.forEach(function (node) {
            if (regex.test(node.nodeValue)) {
                const tempDiv = document.createElement('div');
                tempDiv.innerHTML = node.nodeValue.replace(regex, '<span class="highlight">$1</span>');
                const fragment = document.createDocumentFragment();
                Array.from(tempDiv.childNodes).forEach(function (child) {
                    fragment.appendChild(child);
                });
                node.parentNode.replaceChild(fragment, node);
            }
        });
    }

    // Manejar la búsqueda
    function handleSearch() {
        const searchTerm = searchInput.value.trim();
        highlightText(searchTerm);

        // Desplazarse al primer resultado
        const firstMatch = content.querySelector('.highlight');
        if (firstMatch) {
            firstMatch.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }

    // Eventos del buscador
    searchButton.addEventListener('click', handleSearch);
    searchInput.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            handleSearch();
        }
    });
});


//"SCROLL"

let scrollBtn = document.getElementById("scrollTop"); //Busca el de scroll en el html a través del ID, que sería
//"scroll" y lo guarda dentro de una variable llamda "scrollBtn" (bóton de scroll).

window.addEventListener("scroll", function () { //Detecta y se ejecuta cuando el usuario hace scroll  (desliza) por la página.
    if (window.scrollY > 450) { //Detecta si el usuario ha bajado, utilizando medidas de pixeles
        scrollBtn.classList.add("show"); // Aparece con animación
    } else {
        scrollBtn.classList.remove("show"); // Desaparece suavemente
    }
});


//"SCROLLING DE VIDEOS"

const rightBtn = document.querySelector("#btn-right");
const leftBtn = document.querySelector("#btn-left");
const content = document.querySelector(".scrolling-videos");

// Cantidad a desplazar (ancho de un video + margen)
const scrollAmount = document.querySelector(".video").offsetWidth + 25;

// Función para desplazarse
rightBtn.addEventListener("click", () => {
    content.scrollLeft += scrollAmount;
});

leftBtn.addEventListener("click", () => {
    content.scrollLeft -= scrollAmount;
});


//"ACTIVACIÓN DE PESTAÑAS"

// Selecciona todos los enlaces dentro del contenedor de pestañas
const tabs = document.querySelectorAll('#tabs a');

// Agrega un evento de clic a cada pestaña
tabs.forEach(tab => {
    tab.addEventListener('click', function() {
        //Remueve la clase "active" de todas las pestañas
        tabs.forEach(t => t.classList.remove('active'));

        //Agrega la clase "active" solo a la pestaña a la que se hizo clic
        this.classList.add('active');
    });
});

//Redirige automáticamente al #tab1 si no hay ancla en la URL
document.addEventListener("DOMContentLoaded", function () {
    if (!window.location.hash) {
      window.location.hash = "#tab1";
    }
  });


//"ENLACE AL ARCHIVO JSON"

let translations = {};
let currentLang = 'es';

fetch('../Javascript/Language.json') //Ruta al archivo JSON
  .then(response => response.json())
  .then(data => {
    translations = data;
    translateTo(currentLang); //Traducción inicial
  });

function translateTo(lang) {
  document.querySelectorAll('[data-translate]').forEach(el => {
    const key = el.getAttribute('data-translate');
    const attr = el.getAttribute('data-translate-attr');
    const innerOnly = el.getAttribute('data-translate-inner') === 'true';

    if (attr) {
      //Traduce atributos como placeholder, title, alt, etc.
      el.setAttribute(attr, translations[lang][key] || el.getAttribute(attr));
    } else if (innerOnly) {
      //Traduce solo el texto interno (no elimina íconos o etiquetas hijas)
      el.innerText = translations[lang][key] || el.innerText;
    } else {
      //Traduce todo el contenido del elemento (puede reemplazar íconos si no se usa innerOnly)
      el.textContent = translations[lang][key] || el.textContent;
    }
  });
}

function toggleLanguage() {
  currentLang = currentLang === 'es' ? 'en' : 'es';
  translateTo(currentLang);
}