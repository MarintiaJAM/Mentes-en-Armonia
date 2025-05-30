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
(function(){
  // Declaración de función anónima autoejecutable (IIFE)
  // Esto crea un ámbito local para evitar contaminar el ámbito global

  const input = document.getElementById('searchInput');
  // Obtiene la referencia al input de búsqueda por su id
  // Será donde el usuario escriba el texto a buscar

  const results = document.getElementById('results');
  // Obtiene el contenedor donde se mostrarán los resultados dinámicamente

  const content = document.getElementById('content');
  // Obtiene el contenedor que tiene todo el contenido donde haremos la búsqueda

  // Extraemos los textos y títulos del contenido para buscar
  // Creamos un array de objetos {title, text}
  const sections = [];
  // Array vacío que almacenará objetos con la estructura:
  // { title: 'Título de sección', text: 'Texto completo de esa sección' }

  // Vamos a obtener todos los h2 y sus párrafos hermanos
  const headings = content.querySelectorAll('h2');
  // Obtiene todos los elementos h2 dentro de #content, 
  // para identificar cada sección del contenido (cada tema)

  headings.forEach(h2 => {
    let textBlocks = '';
    // Variable que almacenará concatenado el texto de todos los párrafos de la sección actual

    // Obtener objetos hermanos siguientes hasta el siguiente h2 o fin del contenido
    let sibling = h2.nextElementSibling;
    while(sibling && sibling.tagName !== 'H2'){
      if(sibling.tagName === 'P'){
        // Si el objeto hermano es un párrafo, añadimos su texto al bloque
        textBlocks += sibling.textContent + ' ';
      }
      sibling = sibling.nextElementSibling;
      // Avanzamos al siguiente objeto hermano para revisar
    }

    // Guardamos la sección con título y texto completo
    sections.push({
      title: h2.textContent.trim(),  // Título sin espacios al inicio/final
      text: textBlocks.trim()         // Texto de párrafos concatenados, también limpio
    });
  });

  // Función para escapar caracteres especiales en expresiones regulares
  function escapeRegExp(string) {
    // Esto evita que caracteres con significado especial en regex causen errores
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  // Función para obtener un fragmento de texto (preview) alrededor de la palabra buscada,
  // resaltando la palabra con la etiqueta <mark>
  function getPreview(text, query, previewLen = 100){
    const queryLower = query.toLowerCase();
    const textLower = text.toLowerCase();

    // Buscar la posición donde aparece la palabra (en minúsculas para ignorar mayúsculas)
    const idx = textLower.indexOf(queryLower);
    if(idx === -1) return ''; // Si no se encuentra, retorna cadena vacía

    // Definir inicio y fin del fragmento para la preview, centrado en la palabra buscada
    let start = idx - Math.floor(previewLen / 2);
    if(start < 0) start = 0;
    let end = start + previewLen;
    if(end > text.length) end = text.length;

    // Extraer el fragmento de texto para la preview
    let preview = text.substring(start, end);

    // Crear expresión regular para la palabra buscada (sin importar mayúsc/minúsc)
    const regex = new RegExp(escapeRegExp(query), 'gi');

    // Reemplazar la palabra buscada en el preview con la misma palabra envuelta en <mark>
    preview = preview.replace(regex, (match) => `<mark>${match}</mark>`);

    // Agregar puntos suspensivos al inicio o al final si el preview está cortado
    if(start > 0) preview = '... ' + preview;
    if(end < text.length) preview = preview + ' ...';

    return preview; // Retorna el fragmento con la palabra resaltada
  }

  // Función principal que hace la búsqueda y muestra resultados
  function searchContent(query) {
    results.innerHTML = ''; // Limpia resultados previos

    if(query.trim().length < 2) return; // Ignora búsquedas con menos de 2 caracteres

    const matches = [];
    // Recorre cada sección para buscar coincidencias en título o texto
    sections.forEach(section => {
      if(
        section.text.toLowerCase().includes(query.toLowerCase()) ||
        section.title.toLowerCase().includes(query.toLowerCase())
      ){
        // Si la palabra está en el texto o en el título
        const preview = getPreview(section.text, query); // Obtenemos preview con palabra resaltada
        matches.push({title: section.title, preview}); // Guardamos resultado
      }
    });

    if(matches.length === 0){
      // Si no hay coincidencias, mostramos mensaje
      results.innerHTML = '<p>No se encontraron resultados.</p>';
      return;
    }

    // Usamos un DocumentFragment para insertar resultados sin repintar todo repetidamente
    const fragment = document.createDocumentFragment();

    matches.forEach(m => {
      const div = document.createElement('div');
      div.classList.add('result-item');

      const titleEl = document.createElement('div');
      titleEl.classList.add('result-title');
      titleEl.textContent = m.title;

      const previewEl = document.createElement('div');
      previewEl.classList.add('result-preview');
      // Se usa innerHTML porque preview contiene etiquetas <mark>
      previewEl.innerHTML = m.preview;

      // Construimos el bloque resultado: título + preview
      div.appendChild(titleEl);
      div.appendChild(previewEl);

      fragment.appendChild(div);
    });

    // Insertamos todos los resultados al contenedor de forma eficiente
    results.appendChild(fragment);
  }

  // Event listener para capturar la escritura en el input y lanzar la búsqueda
  input.addEventListener('input', e => {
    searchContent(e.target.value);
  });

})();


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


//"SCROLLING DE VIDEOS" carga y funcionamiento del scrolling horizontal

document.addEventListener("DOMContentLoaded", () => {
  const scrollAmount = 300; // Ajusta esta distancia si lo necesitas

  // Delegación de eventos: busca todos los botones con clase scroll-btn
  document.querySelectorAll('.scroll-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      // Encuentra el contenedor .scrolling-videos más cercano dentro del mismo .scroll-container
      const scrollContainer = btn.closest('.scroll-container').querySelector('.scrolling-videos');

      if (btn.classList.contains('left')) {
        scrollContainer.scrollLeft -= scrollAmount;
      } else if (btn.classList.contains('right')) {
        scrollContainer.scrollLeft += scrollAmount;
      }
    });
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


//"COMENTARIOS"

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("comment-form");
  const input = document.getElementById("comment-input");
  const list = document.getElementById("comments-list");

  const neuroTypeInputs = form.querySelectorAll("input[name='neurotype']");
  const commentCountDisplay = document.getElementById("comment-count");
  const sortSelect = document.getElementById("sort-select");


  let comments = JSON.parse(localStorage.getItem("comments")) || [];

  function saveComments() {
    localStorage.setItem("comments", JSON.stringify(comments));
  }

  if (sortSelect) {
  sortSelect.addEventListener("change", renderComments);
  }

 function renderComments() {
  list.innerHTML = "";

  //Ordenamiento dinámico al renderizar
  const sortOrder = sortSelect?.value || "newest";
  const sortedComments = [...comments];

  if (sortOrder === "newest") {
    sortedComments.sort((a, b) => b.id - a.id);
  } else {
    sortedComments.sort((a, b) => a.id - b.id);
  }

  //Mostrar comentarios ordenados
  sortedComments.forEach((comment) => {
    const el = createCommentElement(comment);
    list.appendChild(el);
  });

  //Actualizar el contador
  commentCountDisplay.textContent = comments.length;
}

  function getNeurotypeTag(type) {
    if (type === "neurodivergente") {
      return `<span class="tag neurodivergente"><i class="fas fa-puzzle-piece"></i> Neurodivergente</span>`;
    } else if (type === "neurotipico") {
      return `<span class="tag neurotipico"><i class="fas fa-seedling"></i> Neurotípico</span>`;
    }
    return "";
  }

  function createCommentElement(comment, isReply = false) {
    const container = document.createElement("div");
    container.className = "comment";
    if (isReply) container.classList.add("reply");

    container.innerHTML = `
      <div class="comment-body">
        <img src="https://i.pravatar.cc/48?u=${Math.random()}" class="avatar" />
        <div class="comment-content">
          <strong>
            ${comment.user}
            ${getNeurotypeTag(comment.neurotype)}
          </strong>
          <p>${comment.text}</p>
        </div>
        <div class="like-button" data-liked="false">
          <i class="fa-regular fa-heart heart-icon"></i>
          <span class="like-text">Me gusta</span>
          <span class="like-count">${comment.likes || 0}</span>
        </div>
      </div>
      <button class="reply-button">Responder</button>
    `;

    //Me gusta
    const likeBtn = container.querySelector(".like-button");
    const heartIcon = likeBtn.querySelector(".heart-icon");
    const likeCount = container.querySelector(".like-count");

    likeBtn.addEventListener("click", () => {
      const liked = likeBtn.getAttribute("data-liked") === "true";

      if (!liked) {
        comment.likes = (comment.likes || 0) + 1;
        likeBtn.setAttribute("data-liked", "true");
        likeBtn.classList.add("liked");
        heartIcon.classList.remove("fa-regular");
        heartIcon.classList.add("fa-solid");
      } else {
        comment.likes -= 1;
        likeBtn.setAttribute("data-liked", "false");
        likeBtn.classList.remove("liked");
        heartIcon.classList.remove("fa-solid");
        heartIcon.classList.add("fa-regular");
      }

      likeCount.textContent = comment.likes;
      saveComments();
    });

    //Responder
    const replyBtn = container.querySelector(".reply-button");
    replyBtn.addEventListener("click", () => {
      const existingForm = container.querySelector(".reply-form");
      if (existingForm) return;

      const replyForm = document.createElement("form");
      replyForm.className = "reply-form";
      replyForm.innerHTML = `
        <textarea placeholder="Escribe una respuesta..." required></textarea>

        <div class="identity-selection">
          <label>
          <input type="radio" name="reply-identity-${comment.id}" value="Neurotípico" required/>
            Neurotípico
          </label>

          <label>
          <input type="radio" name="reply-identity-${comment.id}" value="Neurodivergente" required/>
            Neurodivergente
          </label>
        </div>

        <div class="reply-form-buttons">
          <button type="submit">Publicar</button>
          <button type="button" class="cancel-reply">Cancelar</button>
        </div>
      `;

      replyForm.addEventListener("submit", (e) => {
        e.preventDefault();
        // Lógica para guardar respuesta
        const replyText = replyForm.querySelector("textarea").value;
        const identityValue = replyForm.querySelector(`input[name="reply-identity-${comment.id}"]:checked`)?.value;
        
        const replyComment = {
          id: Date.now(),
          user: "Usuario",
          text: replyText,
          likes: 0,
          replies: [],
          neurotype: identityValue
        };

        comment.replies = comment.replies || [];
        comment.replies.push(replyComment);
        saveComments();
        renderComments(); //Remueve el formulario automáticamente
      });

      //Agregar botón para cancelar respuesta
      replyForm.querySelector(".cancel-reply").addEventListener("click", () => {
        replyForm.remove();
        replyBtn.style.display = "inline-block"; //Vuelve a mostrar el botón "Responder"
      });
      
      replyBtn.style.display = "none"; //Oculta el botón "Responder"
      container.appendChild(replyForm); //Agrega el formulario al comentario
    });

    //Añadir respuestas
    if (comment.replies && comment.replies.length > 0) {
      comment.replies.forEach((reply) => {
        const replyEl = createCommentElement(reply, true);
        container.appendChild(replyEl);
      });
    }

    return container;
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const selectedNeurotype = [...neuroTypeInputs].find((el) => el.checked)?.value || "neurotipico";

    const newComment = {
      id: Date.now(),
      user: "Usuario",
      text: input.value.trim(),
      likes: 0,
      neurotype: selectedNeurotype,
      replies: [],
    };

    if (!newComment.text) return;
    comments.push(newComment);
    saveComments();
    input.value = "";
    renderComments();
  });

  renderComments();
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
