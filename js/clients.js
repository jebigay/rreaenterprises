document.addEventListener("DOMContentLoaded", function () {
  fetch('data/clients.json')
    .then(response => {
      if (!response.ok) {
        throw new Error(`Failed to load JSON: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      const clientData = data.clients;

      const logosContainer = document.getElementById('clientLogos');
      if (!logosContainer) {
        console.error('Missing container with id="clientLogos"');
        return;
      }

      // Filter only featured clients
      const featuredClients = clientData.filter(client => client.featured === true);

      // Optional: Repeat the logos if needed (e.g., for scrolling marquee)
      for (let i = 0; i < 2; i++) {
        featuredClients.forEach(client => {
          const img = document.createElement('img');
          img.src = client.src;
          img.alt = client.alt || "Client Logo";
          logosContainer.appendChild(img);
        });
      }
    })
    .catch(error => {
      console.error('Error fetching client logos:', error);
    });
});


//client feedbacks
document.addEventListener("DOMContentLoaded", function () {
  fetch('data/clientfeedbacks.json')
    .then(response => {
      if (!response.ok) throw new Error('Failed to load client feedbacks');
      return response.json();
    })
    .then(data => {
      const carousel = document.getElementById('carousel');
      if (!carousel) return;

      data.clientfeedbacks.forEach(feedback => {
        const feedbackEl = document.createElement('div');
        feedbackEl.classList.add('testimonial');

        // Determine the avatar image based on gender
        const avatarImage = feedback.gender === 'female' ? 'img/clients/avatar-girl.png' : 'img/clients/avatar-male.png';

        feedbackEl.innerHTML = `
          <div class="testimonial-content">
            <div>
              <blockquote>“${feedback.quote}”</blockquote>
              <p class="title">- ${feedback.author}</p>
            </div>
          </div>
        `;

        carousel.appendChild(feedbackEl);
      });
    })
    .catch(error => console.error('Error loading client feedbacks:', error));
});

//clients page
document.addEventListener("DOMContentLoaded", () => {
  const clientsGrid = document.getElementById("clientsGrid");
  const filtersContainer = document.querySelector(".filters");
  let clientsData = [];
  let uniqueCategories = new Set();

  // Load JSON data
  fetch("data/clients.json")
    .then(response => response.json())
    .then(data => {
      clientsData = data.clients;

      // Collect all unique categories from clients
      clientsData.forEach(client => {
        // Support old "category" string or new "categories" array
        if (Array.isArray(client.categories)) {
          client.categories.forEach(cat => uniqueCategories.add(cat));
        } else if (client.category) {
          uniqueCategories.add(client.category);
        }
      });

      renderFilterButtons();
      renderClients("all");
    })
    .catch(error => console.error("Error loading JSON:", error));

  // Dynamically create filter buttons
  function renderFilterButtons() {
  filtersContainer.innerHTML = "";

  // Create 'All' button
  const allBtn = document.createElement("button");
  allBtn.textContent = "All";
  allBtn.dataset.category = "all";
  allBtn.classList.add("active");
  filtersContainer.appendChild(allBtn);

  // Convert Set to Array and sort categories alphabetically,
  // except "other" which will be placed at the end
  const categoriesArray = Array.from(uniqueCategories).filter(c => c.toLowerCase() !== "other");
  categoriesArray.sort();

  // Append all categories except "other"
  categoriesArray.forEach(category => {
    const btn = document.createElement("button");
    btn.textContent = category.charAt(0).toUpperCase() + category.slice(1);
    btn.dataset.category = category;
    filtersContainer.appendChild(btn);
  });

  // Append "other" category button last if it exists
  if (uniqueCategories.has("other")) {
    const otherBtn = document.createElement("button");
    otherBtn.textContent = "Other";
    otherBtn.dataset.category = "other";
    filtersContainer.appendChild(otherBtn);
  }

  // Add event listeners
  const buttons = filtersContainer.querySelectorAll("button");
  buttons.forEach(button => {
    button.addEventListener("click", () => {
      buttons.forEach(btn => btn.classList.remove("active"));
      button.classList.add("active");
      renderClients(button.dataset.category);
    });
  });
}

  // Render clients filtered by category
  function renderClients(category) {
    clientsGrid.innerHTML = "";

    const filtered = category === "all"
      ? clientsData
      : clientsData.filter(client => {
          // Support both old and new category formats
          if (Array.isArray(client.categories)) {
            return client.categories.includes(category);
          } else if (client.category) {
            return client.category === category;
          }
          return false;
        });

    filtered.forEach(client => {
      const img = document.createElement("img");
      img.src = client.src;
      img.alt = client.alt;
      clientsGrid.appendChild(img);
    });
  }
});


//portfolio
document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById('projects-container');
  const filterContainer = document.getElementById('categoryFilters');
  const modal = document.getElementById('imageModal');
  const modalImg = document.getElementById('modalImage');
  const modalCounter = document.getElementById('modalCounter');
  const modalClose = document.querySelector('.modal-close');
  const prevBtn = document.getElementById('prevImage');
  const nextBtn = document.getElementById('nextImage');

  let clientsData = [];
  let currentGallery = [];
  let currentIndex = 0;

  // Modal controls
  function openModal(images, index = 0) {
    currentGallery = images;
    currentIndex = index;
    showImage(index);
    modal.classList.remove('hidden');
  }

  function closeModal() {
    modal.classList.add('hidden');
  }

  function showImage(index) {
    if (!currentGallery[index]) return;
    modalImg.src = currentGallery[index];
    modalCounter.textContent = `${index + 1}/${currentGallery.length}`;
  }

  prevBtn.onclick = () => {
    currentIndex = (currentIndex - 1 + currentGallery.length) % currentGallery.length;
    showImage(currentIndex);
  };

  nextBtn.onclick = () => {
    currentIndex = (currentIndex + 1) % currentGallery.length;
    showImage(currentIndex);
  };

  modalClose.onclick = closeModal;

  // Fetch data once
  fetch('data/clients.json')
    .then(response => response.json())
    .then(data => {
      clientsData = data.clients;

      const uniqueCategories = new Set();
      clientsData.forEach(client => {
        if (Array.isArray(client.categories)) {
          client.categories.forEach(cat => uniqueCategories.add(cat.trim().toLowerCase()));
        } else if (client.category) {
          uniqueCategories.add(client.category.trim().toLowerCase());
        }
      });

      const sortedCategories = Array.from(uniqueCategories).sort();

      createFilterButtons(sortedCategories);
      renderGalleries("all");
    })
    .catch(error => console.error("Error loading JSON:", error));

  function createFilterButtons(categories) {
    filterContainer.innerHTML = '';

    const allBtn = document.createElement("button");
    allBtn.textContent = "All";
    allBtn.dataset.category = "all";
    allBtn.classList.add("active");
    filterContainer.appendChild(allBtn);

    categories.forEach(cat => {
      const btn = document.createElement("button");
      btn.textContent = cat.charAt(0).toUpperCase() + cat.slice(1);
      btn.dataset.category = cat;
      filterContainer.appendChild(btn);
    });

    filterContainer.addEventListener("click", e => {
      if (e.target.tagName === "BUTTON") {
        document.querySelectorAll("#categoryFilters button").forEach(btn => btn.classList.remove("active"));
        e.target.classList.add("active");
        renderGalleries(e.target.dataset.category);
      }
    });
  }

  function renderGalleries(category) {
    container.innerHTML = "";

    const filteredClients = category === "all"
      ? clientsData
      : clientsData.filter(client => {
          const clientCategories = Array.isArray(client.categories)
            ? client.categories.map(cat => cat.toLowerCase())
            : [client.category?.toLowerCase()];
          return clientCategories.includes(category);
        });

    filteredClients.forEach(client => {
      client.branches.forEach(branch => {
        if (!branch.gallery || branch.gallery.length === 0) return;

        const section = document.createElement('div');
        section.className = 'project-section';

        const title = document.createElement('h3');
        title.className = 'div-title';
        title.textContent = branch.name || client.alt;

        const gallery = document.createElement('div');
        gallery.className = 'project-gallery';

        const maxVisible = 5;
        branch.gallery.slice(0, maxVisible).forEach((img, index) => {
        const imgWrapper = document.createElement('div');
        imgWrapper.classList.add('gallery-img-wrapper');

        const imageTag = document.createElement('img');
        imageTag.src = img;
        imageTag.alt = branch.name || client.alt;
        imageTag.loading = 'lazy';

        // For 5th image (index 4), apply overlay if more images exist
        if (index === maxVisible - 1 && branch.gallery.length > maxVisible) {
          const overlay = document.createElement('div');
          overlay.className = 'more-overlay';
          overlay.textContent = `+${branch.gallery.length - maxVisible}`;

          imgWrapper.classList.add('view-all-img');
          imgWrapper.addEventListener('click', () => openModal(branch.gallery, 0));

          imgWrapper.appendChild(imageTag);
          imgWrapper.appendChild(overlay);
        } else {
          imageTag.addEventListener('click', () => openModal(branch.gallery, index));
          imgWrapper.appendChild(imageTag);
        }

        gallery.appendChild(imgWrapper);
      });

        section.appendChild(title);
        section.appendChild(gallery);
        container.appendChild(section);
      });
    });
  }
});
