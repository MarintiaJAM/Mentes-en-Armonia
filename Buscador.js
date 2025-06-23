document.addEventListener('DOMContentLoaded', () => {
  // ——— Referencias a elementos ———
  const menu = document.querySelector('.menu');
  const menuToggle = document.getElementById('hamburgerBtn') || menu.querySelector('.menu-toggle');
  const searchInput = document.getElementById('searchInput');
  const searchButton = document.getElementById('searchButton');
  const searchSuggestions = document.getElementById('searchSuggestions');
  const pageContent = document.body;

  // ——— Toggle menú ———
  if (menuToggle) {
    menuToggle.addEventListener('click', () => {
      menu.classList.toggle('active');
    });
  }

  // ——— Base de datos de sugerencias ———
  const suggestionDatabase = [
    // Bloque original + adicional
    { text: 'Neurodivergencia', category: 'Información', icon: 'fas fa-brain' },
    { text: 'Nosotros',        category: 'Empresa',      icon: 'fas fa-users' },
    { text: 'Neurotipicidad',  category: 'Información', icon: 'fas fa-brain' },
    { text: 'Líneas de Apoyo', category: 'Apoyo',        icon: 'fas fa-phone' },
    { text: 'Recursos recomendados', category: 'Apoyo',   icon: 'fas fa-video-camera' },
    { text: 'Autismo',         category: 'Neurodivergencia', icon: 'fas fa-puzzle-piece' },
    { text: 'TDAH',            category: 'Neurodivergencia', icon: 'fas fa-puzzle-piece' },
    { text: 'Dislexia',        category: 'Neurodivergencia', icon: 'fas fa-puzzle-piece' },
    { text: 'Tourette',        category: 'Neurodivergencia', icon: 'fas fa-puzzle-piece' },
    { text: 'Dispraxia',       category: 'Neurodivergencia', icon: 'fas fa-puzzle-piece' },
    { text: 'Discalculia',     category: 'Neurodivergencia', icon: 'fas fa-puzzle-piece' },
    { text: 'Ansiedad',        category: 'Neurodivergencia', icon: 'fas fa-puzzle-piece' },
    { text: 'Definición',      category: 'Información', icon: 'fas fa-sticky-note' },
    { text: 'Historia',        category: 'Historia',    icon: 'fas fa-book' },
    { text: 'Identificadores', category: 'Identificación', icon: 'fas fa-check-square' },
    { text: 'Síntomas',        category: 'Identificación', icon: 'fas fa-stethoscope' },
    { text: 'Mitos',           category: 'Información', icon: 'fas fa-eye' },
    { text: 'Sub-tipos',       category: 'Neurodivergencia', icon: 'fas fa-list' },
    { text: 'Terapias',        category: 'Apoyo',      icon: 'fas fa-heart' },
  ];

  // ——— Mapeo de texto a URL ———
  const pageLinks = {
    // Neurodivergencia
    'Autismo': 'Autismo.html',
    'TDAH': 'TDAH.html',
    'Dislexia': 'Dislexia.html',
    'Tourette': 'Tourette.html',
    'Dispraxia': 'Dispraxia.html',
    'Discalculia': 'Discalculia.html',
    'Ansiedad': 'Ansiedad.html',
    'Definición': 'index.html#Definicion',
    'Historia': 'index.html#Historia',
    'Identificadores': 'index.html#Identificadores',
    'Síntomas': 'index.html#Sintomas',
    'Mitos': 'index.html#Mitos',
    'Sub-tipos': 'index.html#Subtipos',
    'Terapias': 'index.html#Terapias',

    // Navegación principal
    'Inicio': 'index.html#Menu',
    'Acerca de': 'index.html#Acerca',
    'Definiciones': 'index.html#Definiciones',
    'Neurodivergencia': 'index.html#Neurodivergencia',
    'Líneas de apoyo': 'index.html#Lineap',
    'Centro de recursos': 'index.html#Recursos',
    'Pie de página': 'index.html#Footer',
  };

  let selectedSuggestionIndex = -1;

  // ——— Resalta texto en la página ———
  function highlightText(text) {
    // Limpiar resaltados previos
    document.querySelectorAll('.highlight').forEach(el => {
      const parent = el.parentNode;
      parent.replaceChild(document.createTextNode(el.textContent), el);
      parent.normalize();
    });
    if (!text) return;

    const regex = new RegExp(`(${text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    const walker = document.createTreeWalker(pageContent, NodeFilter.SHOW_TEXT, null, false);
    const textNodes = [];
    while (walker.nextNode()) textNodes.push(walker.currentNode);

    let firstMatch = null;
    textNodes.forEach(node => {
      if (regex.test(node.nodeValue)) {
        const span = document.createElement('span');
        span.className = 'highlight';
        span.innerHTML = node.nodeValue.replace(regex, '<mark>$1</mark>');
        node.parentNode.replaceChild(span, node);
        if (!firstMatch) firstMatch = span;
      }
    });
    if (firstMatch) {
      firstMatch.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }

  // ——— Mostrar sugerencias ———
  function showSuggestions(query) {
    const trimmed = query.trim();
    const filtered = !trimmed
      ? suggestionDatabase
      : suggestionDatabase.filter(i => i.text.toLowerCase().includes(trimmed.toLowerCase()));

    if (filtered.length === 0) {
      searchSuggestions.innerHTML = '<div class="no-suggestions">No se encontraron sugerencias</div>';
    } else {
      searchSuggestions.innerHTML = filtered.map((item, idx) => `
        <div class="suggestion-item" data-index="${idx}" data-text="${item.text}">
          <i class="${item.icon}"></i>
          <span class="suggestion-text">${item.text}</span>
          <span class="suggestion-category">${item.category}</span>
        </div>
      `).join('');
    }
    searchSuggestions.classList.add('show');
    selectedSuggestionIndex = -1;
  }

  function hideSuggestions() {
    searchSuggestions.classList.remove('show');
    selectedSuggestionIndex = -1;
  }

  // ——— Ejecutar búsqueda / navegación ———
  function executeSearch(searchTerm = null) {
    const query = (searchTerm || searchInput.value).trim();
    const items = Array.from(searchSuggestions.querySelectorAll('.suggestion-item'));

    // Si hay sugerencias visibles, prioriza la primera
    if (items.length > 0) {
      const target = items[selectedSuggestionIndex >= 0 ? selectedSuggestionIndex : 0].dataset.text;
      if (pageLinks[target]) {
        window.location.href = pageLinks[target];
      } else {
        highlightText(target);
        hideSuggestions();
      }
    } else if (query) {
      if (pageLinks[query]) {
        window.location.href = pageLinks[query];
      } else {
        highlightText(query);
        hideSuggestions();
      }
    }
  }

  function selectSuggestion(text) {
    searchInput.value = text;
    executeSearch(text);
  }

  function updateSelectedSuggestion(items) {
    items.forEach((it, i) => it.classList.toggle('selected', i === selectedSuggestionIndex));
  }

  // ——— Event listeners ———
  if (searchInput && searchSuggestions) {
    searchInput.addEventListener('input', () => showSuggestions(searchInput.value));
    searchInput.addEventListener('keydown', e => {
      const items = Array.from(searchSuggestions.querySelectorAll('.suggestion-item'));
      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          selectedSuggestionIndex = Math.min(selectedSuggestionIndex + 1, items.length - 1);
          updateSelectedSuggestion(items);
          break;
        case 'ArrowUp':
          e.preventDefault();
          selectedSuggestionIndex = Math.max(selectedSuggestionIndex - 1, -1);
          updateSelectedSuggestion(items);
          break;
        case 'Enter':
          e.preventDefault();
          if (selectedSuggestionIndex >= 0) {
            selectSuggestion(items[selectedSuggestionIndex].dataset.text);
          } else {
            executeSearch();
          }
          break;
        case 'Escape':
          hideSuggestions();
          break;
      }
    });
    searchInput.addEventListener('blur', () => setTimeout(hideSuggestions, 200));
    searchInput.addEventListener('focus', () => showSuggestions(searchInput.value));
  }

  if (searchSuggestions) {
    searchSuggestions.addEventListener('click', e => {
      const itm = e.target.closest('.suggestion-item');
      if (itm) selectSuggestion(itm.dataset.text);
    });
  }

  if (searchButton) {
    searchButton.addEventListener('click', () => executeSearch());
  }

  document.addEventListener('click', e => {
    if (!e.target.closest('.search-container')) {
      hideSuggestions();
    }
  });
});