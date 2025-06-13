//"COLORES DE LINKS"

//Espera a que el DOM cargue para procesar los enlaces
document.addEventListener("DOMContentLoaded", () => {
    //Selecciona todos los enlaces que deben rastrear si fueron visitados durante la sesión
    const links = document.querySelectorAll("a.track-link");

    //Restaurar estado visitado desde sessionStorage
    links.forEach(link => {
      const href = link.href;

      //Si el enlace ya fue marcado como visitado en sessionStorage, añade la clase correspondiente
      if (sessionStorage.getItem(href)) {
        link.classList.add("visited-during-session");
      }

      //Al hacer clic en el enlace, se marca como "visitado" y se guarda el estado
      link.addEventListener("click", () => {
        sessionStorage.setItem(href, "true");
        link.classList.add("visited-during-session");
      });
    });
  });


//"ROTACIÓN DE CHEVRON AL DAR CLIC"
document.querySelectorAll('.acordeon-toggle').forEach(toggle => {
  toggle.addEventListener('click', () => {
    const chevron = toggle.querySelector('.chevron');
    chevron.classList.toggle('rotate');
  });
});


//"SCROLL" botón de scroll que lleva al usuario al inicio de la página

//Referencia al botón scroll
let scrollBtn = document.getElementById("scrollTop");

//Detecta el evento de desplazamiento en la ventana
window.addEventListener("scroll", function () {

    //Si el usuario ha bajado más de 450px, muestra el botón
    if (window.scrollY > 450) {
        scrollBtn.classList.add("show");
    } else {
        //Si sube por encima del umbral, oculta el botón
        scrollBtn.classList.remove("show");
    }
});


//"FUNCIONALIDADES Y FORMULARIO DE INICIO DE SESIÓN"

// Abrir/cerrar el modal
function toggleLoginModal() {
    const modal = document.getElementById("loginModal");
    modal.style.display = modal.style.display === "flex" ? "none" : "flex";

    // Reiniciar el formulario al abrir/cerrar
    if (modal.style.display === "flex") {
        limpiarFormulario();
    }
}

// Mostrar u ocultar contraseña
const togglePassword = document.getElementById("togglePassword");
const passwordInput = document.getElementById("password");

togglePassword.addEventListener("click", () => {
    const isPassword = passwordInput.type === "password";
    passwordInput.type = isPassword ? "text" : "password";
    togglePassword.classList.toggle("fa-eye");
    togglePassword.classList.toggle("fa-eye-slash");
});

// Validación del email
const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Mostrar mensajes de error
function mostrarError(inputId, mensaje) {
    const input = document.getElementById(inputId);
    input.classList.add("input-error");

    let feedback = input.nextElementSibling;
    if (!feedback || !feedback.classList.contains("input-feedback")) {
        feedback = document.createElement("span");
        feedback.className = "input-feedback";
        input.parentNode.insertBefore(feedback, input.nextSibling);
    }

    feedback.textContent = mensaje;
}

// Limpiar errores
function limpiarErrores() {
    document.querySelectorAll(".input-error").forEach(el => el.classList.remove("input-error"));
    document.querySelectorAll(".input-feedback").forEach(el => el.remove());
}

// Limpiar campos
function limpiarFormulario() {
    document.getElementById("formulario").reset();
    limpiarErrores();
    actualizarBarraFortaleza(0); // Reiniciar barra
    passwordInput.type = "password";
    togglePassword.classList.remove("fa-eye-slash");
    togglePassword.classList.add("fa-eye");
}

// Medidor de fortaleza de contraseña
passwordInput.addEventListener("input", () => {
    const value = passwordInput.value;
    const nivel = evaluarFortaleza(value);
    actualizarBarraFortaleza(nivel);
});

function evaluarFortaleza(pass) {
    let nivel = 0;
    if (pass.length >= 5) nivel++;
    if (/[a-z]/.test(pass)) nivel++;
    if (/[A-Z]/.test(pass)) nivel++;
    if (/\d/.test(pass)) nivel++;
    if (/[\W_]/.test(pass)) nivel++;
    return Math.min(nivel, 5);
}

function actualizarBarraFortaleza(nivel) {
    const barra = document.querySelector(".password-strength::after"); // No funciona con pseudo-elementos
    const realBar = document.querySelector(".password-strength");
    if (!realBar) return;

    realBar.innerHTML = ""; // Limpiar cualquier contenido previo

    const inner = document.createElement("div");
    inner.style.height = "100%";
    inner.style.width = `${(nivel / 5) * 100}%`;
    inner.style.borderRadius = "3px";
    inner.style.transition = "width 0.3s ease-in-out";

    // Color según fortaleza
    switch (nivel) {
        case 0:
        case 1: inner.style.backgroundColor = "#e55b5b"; break;
        case 2: inner.style.backgroundColor = "#f1c40f"; break;
        case 3:
        case 4: inner.style.backgroundColor = "#2ecc71"; break;
        case 5: inner.style.backgroundColor = "#27ae60"; break;
    }

    realBar.appendChild(inner);
}

// Validación de inicio de sesión
function validarFormulario() {
    limpiarErrores(); // Limpia antes de validar

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    let valido = true;

    if (email === "") {
        mostrarError("email", "Este campo es obligatorio.");
        valido = false;
    } else if (!regexEmail.test(email)) {
        mostrarError("email", "Formato de correo inválido.");
        valido = false;
    }

    if (password === "") {
        mostrarError("password", "Este campo es obligatorio.");
        valido = false;
    } else if (password.length < 5) {
        mostrarError("password", "Debe tener al menos 5 caracteres.");
        valido = false;
    }

    if (!valido) return false;

    const usuariosGuardados = JSON.parse(localStorage.getItem("usuarios")) || [];
    const usuarioEncontrado = usuariosGuardados.find(
        usuario => usuario.correo === email && usuario.password === password
    );

    if (!usuarioEncontrado) {
        mostrarError("email", "Correo o contraseña incorrectos.");
        mostrarError("password", "");
        return false;
    }

    alert("¡Inicio de sesión exitoso!");
    toggleLoginModal();
    return false;
}


//"SCROLLING DE VIDEOS" carga y funcionamiento del scrolling horizontal

//Espera a que el DOM esté completamente cargado para configurar la funcionalidad
document.addEventListener("DOMContentLoaded", () => {
  const scrollAmount = 275; //Define cuántos píxeles se moverá el scroll al hacer clic

  //Selecciona todos los botones de desplazamiento (izquierda y derecha)
  document.querySelectorAll('.scroll-btn').forEach(btn => {
    //Asigna un evento a cada botón
    btn.addEventListener('click', () => {
      //Busca el contenedor de videos más cercano dentro del grupo contenedor de videos
      const scrollContainer = btn.closest('.scroll-container').querySelector('.scrolling-videos');

      //Si el botón es de clase "left", se desplaza hacia la izquierda
      if (btn.classList.contains('left')) {
        scrollContainer.scrollLeft -= scrollAmount;
      } 
      //Si es de clase "right", se desplaza hacia la derecha
      else if (btn.classList.contains('right')) {
        scrollContainer.scrollLeft += scrollAmount;
      }
    });
  });
});


//"ACTIVACIÓN DE PESTAÑAS"

//Selecciona todos los enlaces que actúan como pestañas
const tabs = document.querySelectorAll('#tabs a');
//Selecciona todos los contenidos asociados a las pestañas
const tabContents = document.querySelectorAll('.tab-content');

//Itera por cada pestaña y le asigna un evento de clic
tabs.forEach(tab => {
    tab.addEventListener('click', function (e) {
        e.preventDefault(); //Evita el comportamiento por defecto del enlace (navegar a #id)

        //Desactiva todas las pestañas y sus contenidos
        tabs.forEach(t => t.classList.remove('active'));
        tabContents.forEach(c => c.classList.remove('active'));

        //Activa la pestaña y el contenido correspondiente al hacer clic
        this.classList.add('active');
        const targetId = this.getAttribute('href'); //Obtiene el ID del contenido
        const targetContent = document.querySelector(targetId);
        if (targetContent) {
            targetContent.classList.add('active');
        }
    });
});

//Al cargar la página, activa una pestaña por defecto si no hay un hash en la URL
document.addEventListener("DOMContentLoaded", function () {
    if (!window.location.hash) {
        const defaultTabLink = document.querySelector('#tabs a[href="#tab1"]');
        if (defaultTabLink) {
            defaultTabLink.click();
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
        //Lógica para guardar respuesta
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



//ESTADO ACTVIO DE SECCIONES, SUBRAYADO, TRADUCTOR Y ENLACE AL JSON

document.addEventListener("DOMContentLoaded", () => {
    const lang = localStorage.getItem("lang") || "es";
    const path = window.location.pathname.toLowerCase();

    let activeKey = "menu-sec2"; //Default
    let dropdownId = "neuroToggle";

    if (path.includes("autismo")) {
        activeKey = "autismo";
    } else if (path.includes("tdah")) {
        activeKey = "tdah";
    }

    // Guardar info para usar luego si es necesario
    localStorage.setItem("activeDropdownKey", activeKey);
    localStorage.setItem("activeDropdownId", dropdownId);

    // Cambiar texto del botón dropdown
    const labelSpan = document.querySelector(`#${dropdownId} .dropdown-label`);
    if (labelSpan && typeof translations !== "undefined") {
        const translatedText = translations[lang]?.[activeKey];
        if (translatedText) {
            labelSpan.textContent = translatedText;
        }
    }

    // Subrayar el enlace activo
    const links = document.querySelectorAll(".dropdown-menu a");
    links.forEach(link => {
        const href = link.getAttribute("href").toLowerCase();
        if (path.includes(href)) {
            link.classList.add("active");
        } else {
            link.classList.remove("active");
        }
    });
});


//TRADUCTOR, FUNCIONALIDADES Y ENLACE AL LANGUAGE.JS

//Idioma actual desde localStorage o por defecto español
let currentLang = localStorage.getItem('lang') || 'es';

//Cambiar idioma
function setLanguage(lang) {
    if (lang === currentLang) return;

    currentLang = lang;
    localStorage.setItem('lang', lang);

    //Actualiza la bandera
    const flagImg = document.getElementById('currentFlag');
    if (flagImg) {
        flagImg.src = lang === 'en'
            ? '../img/Bandera_Estados_Unidos.webp'
            : '../img/Bandera_Espana.webp';
    }

    //Aplica traducción
    translatePage(lang);

    //Cierra el menú desplegable
    const dropdown = document.getElementById('languageDropdown');
    if (dropdown) dropdown.classList.add('hidden');
}

//Mostrar/ocultar selector
function toggleDropdown() {
    const dropdown = document.getElementById('languageDropdown');
    dropdown.classList.toggle('hidden');
}

//Cerrar menú si haces clic fuera
document.addEventListener('click', function (e) {
    const dropdown = document.getElementById('languageDropdown');
    const btn = document.getElementById('translateBtn');
    if (dropdown && !dropdown.contains(e.target) && !btn.contains(e.target)) {
        dropdown.classList.add('hidden');
    }
});

//Al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    updateFlag(currentLang);
    translateTo(currentLang); //Aplica traducción inicial
});