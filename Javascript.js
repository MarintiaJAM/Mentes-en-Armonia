document.addEventListener('DOMContentLoaded', function () {
    const menu = document.querySelector('.menu');
    const menuToggle = menu.querySelector('.menu-toggle');
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    const content = document.body;

    //Mostrar/ocultar menú en dispositivos móviles
    menuToggle.addEventListener('click', function () {
        menu.classList.toggle('active');
    });

    //Función para resaltar texto dentro del contenido
    function highlightText(text) {
        //Eliminar resaltados previos
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

    //Manejar la búsqueda
    function handleSearch() {
        const searchTerm = searchInput.value.trim();
        highlightText(searchTerm);

        //Desplazarse al primer resultado
        const firstMatch = content.querySelector('.highlight');
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


//"ADAPTADOR DE PANTALLAS"

function checkScreenSize() {
    const content = document.getElementById('body')
}

window.onload = checkScreenSize;

window.onresize = checkScreenSize;


//"SCROLLING DE VIDEOS"
const rightBtn = document.querySelector("#btn-right");
const leftBtn = document.querySelector("#btn-left");
const content = document.querySelector(".scrolling-videos");

//Cantidad a desplazar (ancho de un video + margen)
const scrollAmount = document.querySelector(".video").offsetWidth + 20;

//Función para desplazarse
rightBtn.addEventListener("click", () => {
    content.scrollLeft += scrollAmount;
});

leftBtn.addEventListener("click", () => {
    content.scrollLeft -= scrollAmount;
});