document.addEventListener('DOMContentLoaded', function () {
    const menu = document.querySelector('.menu');
    const menuToggle = menu.querySelector('.menu-toggle');
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    const pageContent = document.body;

    //Mostrar/ocultar menú en dispositivos móviles
    menuToggle.addEventListener('click', function () {
    menu.classList.toggle('active');
});


//"BARRA DE BÚSQUEDA"

//Función para resaltar texto dentro del contenido
function highlightText(text) {
    const highlightedElements = pageContent.querySelectorAll('.highlight');
    highlightedElements.forEach(function (element) {
        const parent = element.parentNode;
        parent.replaceChild(document.createTextNode(element.textContent), element);
        parent.normalize();
    });

    if (text === '') return;

    const regex = new RegExp(`(${text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    const walker = document.createTreeWalker(pageContent, NodeFilter.SHOW_TEXT, null, false);
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

//Manejar la búsqueda
function handleSearch() {
    const searchTerm = searchInput.value.trim();
    highlightText(searchTerm);

    const firstMatch = pageContent.querySelector('.highlight');
    if (firstMatch) {
        firstMatch.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}

//Eventos del buscador
searchButton.addEventListener('click', handleSearch);
searchInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        handleSearch();
        }
    });
});


//"COLORES DE LINKS"

document.addEventListener("DOMContentLoaded", () => {
    const links = document.querySelectorAll("a.track-link");

    //Restaurar estado visitado desde sessionStorage
    links.forEach(link => {
      const href = link.href;
      if (sessionStorage.getItem(href)) {
        link.classList.add("visited-during-session");
      }

      //Al hacer clic, marcar como visitado
      link.addEventListener("click", () => {
        sessionStorage.setItem(href, "true");
        link.classList.add("visited-during-session");
      });
    });
  });


//"SCROLL"

let scrollBtn = document.getElementById("scrollTop");

window.addEventListener("scroll", function () {
    if (window.scrollY > 450) {
        scrollBtn.classList.add("show");
    } else {
        scrollBtn.classList.remove("show");
    }
});


//"FORMULARIO DE INICIO DE SESIÓN"

function toggleLoginModal() {
    const modal = document.getElementById("loginModal");
    modal.style.display = modal.style.display === "flex" ? "none" : "flex";
}

const togglePassword = document.getElementById("togglePassword");
const passwordInput = document.getElementById("password");

togglePassword.addEventListener("click", () => {
    const isPassword = passwordInput.type === "password";
     passwordInput.type = isPassword ? "text" : "password";

//Cambia el ícono
    togglePassword.classList.toggle("fa-eye");
    togglePassword.classList.toggle("fa-eye-slash");
});


//"SCROLLING DE VIDEOS"

window.addEventListener("load", () => {
    const rightBtn = document.querySelector("#btn-right");
    const leftBtn = document.querySelector("#btn-left");
    const videoContent = document.querySelector(".scrolling-videos");

    const videoCard = document.querySelector(".video");
    const scrollAmount = videoCard.offsetWidth + 25; // Calculado después de que todo cargue

    rightBtn?.addEventListener("click", () => {
        videoContent.scrollLeft += scrollAmount;
    });

    leftBtn?.addEventListener("click", () => {
        videoContent.scrollLeft -= scrollAmount;
    });
});


//"ACTIVACIÓN DE PESTAÑAS"

const tabs = document.querySelectorAll('#tabs a');
const tabContents = document.querySelectorAll('.tab-content');

tabs.forEach(tab => {
    tab.addEventListener('click', function (e) {
        e.preventDefault(); // Prevenir el salto automático por el hash (#tabX)

        // Quitar clases activas de todos
        tabs.forEach(t => t.classList.remove('active'));
        tabContents.forEach(c => c.classList.remove('active'));

        // Activar pestaña y contenido actual
        this.classList.add('active');
        const targetId = this.getAttribute('href');
        const targetContent = document.querySelector(targetId);
        if (targetContent) {
            targetContent.classList.add('active');
        }
    });
});

//Activación por defecto al cargar (cuando no hay hash en la URL)
document.addEventListener("DOMContentLoaded", function () {
    if (!window.location.hash) {
        const defaultTabLink = document.querySelector('#tabs a[href="#tab1"]');
        const defaultTabContent = document.querySelector('#tab1');

        if (defaultTabLink && defaultTabContent) {
            defaultTabLink.classList.add('active');
            defaultTabContent.classList.add('active');
        }
    }
});

//"ENLACE AL ARCHIVO JSON"

let translations = {};
let currentLang = 'es';

fetch('../Javascript/Language.json')
    .then(response => response.json())
    .then(data => {
        translations = data;
        translateTo(currentLang);
  });

function translateTo(lang) {
    const langSet = translations[lang] || {};
    document.querySelectorAll('[data-translate]').forEach(el => {
        const key = el.getAttribute('data-translate');
        const attr = el.getAttribute('data-translate-attr');
        const innerOnly = el.getAttribute('data-translate-inner') === 'true';

        if (key && langSet[key]) {
            if (attr) {
                el.setAttribute(attr, langSet[key]);
            } else if (innerOnly) {
                el.innerText = langSet[key];
            } else {
                el.textContent = langSet[key];
            }
        }
    });
}

function toggleLanguage() {
    currentLang = currentLang === 'es' ? 'en' : 'es';
    translateTo(currentLang);
}
