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


/*SECCIÓN VÍDEO ANIMACIÓN SSOBRE NOSOTROS*/
document.addEventListener("DOMContentLoaded", function () {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                } else {
                    entry.target.classList.remove("visible");
                }
            });
        }, {
            threshold: 0.4 // Puedes ajustar este valor para mayor o menor sensibilidad
        });

        const aboutSection = document.querySelector('.about-section');
        observer.observe(aboutSection);
    });


//"MENÚ HAMBURGUESA PARA MÓVILES"

// Referencias principales del DOM
const hamburgerBtn = document.getElementById('hamburgerBtn');   // Botón hamburguesa
const sidebar = document.getElementById('sidebar');             // Menú lateral
const closeMenuBtn = document.getElementById('close-menu');
const overlay = document.getElementById('menu-overlay');        // Fondo oscuro

// Alterna clases para abrir/cerrar menú lateral
function toggleSidebar() {
    hamburgerBtn.classList.toggle('active');
    sidebar.classList.toggle('active');
    overlay.classList.toggle('active');
}

//Abrir al hacer clic en el botón hamburguesa
hamburgerBtn.addEventListener('click', toggleSidebar);

//Cerrar al hacer clic en el botón x
closeMenuBtn.addEventListener('click', toggleSidebar);

// Cerrar al hacer clic fuera del menú (overlay)
overlay.addEventListener('click', toggleSidebar);

//"SUBMENÚ DESPLEGABLE"

/**
 * Controla la apertura/cierre de submenús verticales
 * @param {string} submenuId - ID del submenú (ej. 'neuroSubmenu')
 */
function toggleSubmenu(submenuId) {
    const submenu = document.getElementById(submenuId); // Submenú actual
    const chevron = submenu.previousElementSibling.querySelector('.chevron'); // Flecha asociada

    // Cierra todos los demás submenús
    const allSubmenus = document.querySelectorAll('.sidebar-dropdown');
    const allChevrons = document.querySelectorAll('.chevron');

    allSubmenus.forEach((menu, i) => {
        if (menu.id !== submenuId) {
            menu.classList.remove('active');
            allChevrons[i].classList.remove('rotated');
        }
    });

    // Alternar el submenú actual y su flecha
    submenu.classList.toggle('active');
    chevron.classList.toggle('rotated');
};

//"BLOQUEAR SCROLL CUANDO EL MENÚ ESTÁ ABIERTO"
const body = document.body;

const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
        if (mutation.attributeName === 'class') {
            if (sidebar.classList.contains('active')) {
                body.style.overflow = 'hidden';
            } else {
                body.style.overflow = '';
            }
        }
    });
});

observer.observe(sidebar, {
    attributes: true,
    attributeFilter: ['class']
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


//"FORMULARIO DE INICIO DE SESIÓN Y FUNCIONALIDADES"

document.addEventListener("DOMContentLoaded", function () {
    // Elementos
    const emailInput = document.getElementById("email");
    const emailFeedback = document.getElementById("emailFeedback");
    const confirmEmail = document.getElementById("confirmEmail");
    const confirmEmailFeedback = document.getElementById("confirmEmailFeedback");
    const passwordFeedback = document.getElementById("passwordFeedback");
    const confirmPassword = document.getElementById("confirmPassword");
    const confirmPasswordFeedback = document.getElementById("confirmPasswordFeedback");
    const togglePassword = document.getElementById("togglePassword");
    const passwordInput = document.getElementById("password");

    togglePassword.addEventListener("click", () => {
    const isPassword = passwordInput.type === "password";
    passwordInput.type = isPassword ? "text" : "password";
    
    // Cambiar solo un icono, de forma segura
    togglePassword.classList.remove("fa-eye", "fa-eye-slash");
    togglePassword.classList.add(isPassword ? "fa-eye-slash" : "fa-eye");
});


    // Abrir/cerrar modal
    window.toggleLoginModal = function () {
        const modal = document.getElementById("loginModal");
        modal.style.display = modal.style.display === "flex" ? "none" : "flex";
        if (modal.style.display === "flex") limpiarFormulario();
    };

    // Validación email
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    emailInput.addEventListener("input", () => {
        const valor = emailInput.value.trim();
        if (valor === "") {
            emailInput.classList.remove("input-error");
            emailFeedback.textContent = "";
        } else if (!regexEmail.test(valor)) {
            emailInput.classList.add("input-error");
            emailFeedback.textContent = "Correo electrónico no válido.";
        } else {
            emailInput.classList.remove("input-error");
            emailFeedback.textContent = "";
        }
    });

    // Medidor de contraseña
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
    const realBar = document.getElementById("passwordStrength");
    const feedback = document.getElementById("passwordFeedback");
    const label = document.getElementById("passwordStrengthLabel");
    const password = document.getElementById("password").value;

    if (!realBar || !feedback || !label) return;

    // Mostrar solo si hay algo escrito
    if (password.length === 0) {
        label.style.display = "none";
        feedback.style.display = "none";
        realBar.style.display = "none";
        return;
    }

    label.style.display = "block";
    feedback.style.display = "block";
    realBar.style.display = "block";

    // Crear barra interna si no existe
    let inner = realBar.querySelector("div");
    if (!inner) {
        inner = document.createElement("div");
        realBar.appendChild(inner);
    }

    // Determinar color y mensaje
    let color = "#ccc";
    let mensaje = "";

    switch (nivel) {
        case 0:
        case 1:
            color = "#e55b5b";
            mensaje = "Débil - Necesita mejoras";
            break;
        case 2:
            color = "#f1c40f";
            mensaje = "Regular - Puede mejorar";
            break;
        case 3:
        case 4:
            color = "#2ecc71";
            mensaje = "Buena - Bastante segura";
            break;
        case 5:
            color = "#27ae60";
            mensaje = "Excelente - Muy segura";
            break;
    }

    inner.style.width = `${(nivel / 5) * 100}%`;
    inner.style.backgroundColor = color;

    feedback.textContent = mensaje;
    feedback.style.color = color;
}

    // Validar formulario
    window.validarFormulario = function () {
        limpiarErrores();

        let valido = true;
        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();

        if (email === "") {
            mostrarError(emailInput, emailFeedback, "Este campo es obligatorio.");
            valido = false;
        } else if (!regexEmail.test(email)) {
            mostrarError(emailInput, emailFeedback, "Formato de correo inválido.");
            valido = false;
        }

        if (password === "") {
            mostrarError(passwordInput, passwordFeedback, "Este campo es obligatorio.");
            valido = false;
        } else if (password.length < 5) {
            mostrarError(passwordInput, passwordFeedback, "Debe tener al menos 5 caracteres.");
            valido = false;
        }

        if (!valido) return false;

        const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
        const encontrado = usuarios.find(u => u.correo === email && u.password === password);

        if (!encontrado) {
            mostrarError(emailInput, emailFeedback, "Correo o contraseña incorrectos.");
            mostrarError(passwordInput, passwordFeedback, "");
            return false;
        }

        enviarNotificacionLogin(email);
        alert("¡Inicio de sesión exitoso!");
        toggleLoginModal();
        return false;
    };

    function mostrarError(input, feedbackEl, mensaje) {
        input.classList.add("input-error");
        feedbackEl.textContent = mensaje;
    }

    function limpiarErrores() {
        document.querySelectorAll(".input-error").forEach(el => el.classList.remove("input-error"));
        document.querySelectorAll(".input-feedback").forEach(el => el.textContent = "");
    }

    function limpiarFormulario() {
        document.getElementById("formulario").reset();
        limpiarErrores();
        actualizarBarraFortaleza(0);
        passwordInput.type = "password";
        togglePassword.classList.remove("fa-eye-slash");
        togglePassword.classList.add("fa-eye");
    }

    // EmailJS (enviar notificación de inicio de sesión exitoso)
    emailjs.init("18FxYJbGOd0jKHoWy"); // ← Reemplaza con tu User ID (lo ves en Dashboard de EmailJS)

    function enviarNotificacionLogin(email) {
        emailjs.send("service_frdvytj", "template_jwbzdh8", {
            user_email: email
        })
        .then(() => {
            console.log("Notificación de inicio de sesión enviada.");
        })
        .catch((error) => {
            console.error("Error al enviar el correo de notificación:", error);
        });
    }
});


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


//"ACTIVACIÓN DE PESTAÑAS Y CARGA DINÁMICA DE ENCUESTAS"

const tabLinks = document.querySelectorAll('#tabs-surveys a');
const tabPanels = document.querySelectorAll('.tab-content');

// Lleva control de qué archivos ya se han cargado
const loadedScripts = {
  tab1: false, // Autismo
  tab2: false, // TDAH
  tab3: false, // Dislexia
  tab4: false, // Discalculia
  tab5: false  // Ansiedad
};

// Asocia cada pestaña con su archivo JS
const scriptMap = {
  tab1: "Autismo.js",
  tab2: "TDAH.js",
  tab3: "Dislexia.js",
  tab4: "Discalculia.js",
  tab5: "Ansiedad.js"
};

// Función para cargar un script externo solo una vez
function loadScriptOnce(tabId) {
  if (loadedScripts[tabId]) return;

  const script = document.createElement('script');
  script.src = `./${scriptMap[tabId]}`;
  script.onload = () => {
    loadedScripts[tabId] = true;
    console.log(`${scriptMap[tabId]} cargado.`);
  };
  script.onerror = () => {
    console.error(`Error cargando ${scriptMap[tabId]}`);
  };

  document.body.appendChild(script);
}

// Función para activar la pestaña
function activateTab(link) {
  if (link.classList.contains('active')) return;

  tabLinks.forEach(l => l.classList.remove('active'));
  tabPanels.forEach(p => p.classList.remove('active'));

  link.classList.add('active');
  const target = document.querySelector(link.getAttribute('href'));
  if (target) {
    target.classList.add('active');

    // Carga el script correspondiente
    const tabId = target.id; // ej: tab1
    loadScriptOnce(tabId);
  }
}

// Escuchar clics en pestañas
tabLinks.forEach(link => {
  link.addEventListener('click', function (e) {
    e.preventDefault();
    activateTab(this);
  });
});

// Activar pestaña al cargar
document.addEventListener("DOMContentLoaded", function () {
  const hash = window.location.hash;
  const tabToActivate = hash
    ? document.querySelector(`#tabs-surveys a[href="${hash}"]`)
    : document.querySelector('#tabs-surveys a[href="#tab1"]');

  if (tabToActivate) activateTab(tabToActivate);
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


//"UBICACIÓN DE SECCIONES Y SUBSECCIONES"

document.addEventListener('DOMContentLoaded', function () {
    const currentPath = window.location.pathname.split('/').pop(); // ej: "TDAH.html"


    //"RESALTADO DEL SIDEBAR"

    const sidebarLinks = document.querySelectorAll('.sidebar-content a');

    sidebarLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        if (linkHref === currentPath) {
            link.classList.add('active');

            // Desplegar submenú si es necesario
            if (link.classList.contains('submenu-item')) {
                const dropdown = link.closest('.sidebar-dropdown');
                dropdown.classList.add('active');

                const chevron = dropdown.previousElementSibling.querySelector('.chevron');
                if (chevron) chevron.classList.add('rotated');
            }
        }
    });

    //"RESALTADO DEL NAVBAR"

    const navbarLinks = document.querySelectorAll('.navbar a');

    navbarLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        if (linkHref === currentPath) {
            link.classList.add('active');

            // Abrir el dropdown correspondiente si el enlace está dentro
            const dropdown = link.closest('.dropdown-content');
            if (dropdown) {
                dropdown.style.display = 'block'; // Mostrar el menú (opcional)
                const parentToggle = dropdown.previousElementSibling;
                if (parentToggle && parentToggle.classList.contains('dropdown-toggle')) {
                    const chevron = parentToggle.querySelector('.chevron');
                    if (chevron) chevron.classList.add('rotated');
                }
            }
        }
    });
});


//"TRADUCTOR Y ENLACE AL LANGUAGE.JS"

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
