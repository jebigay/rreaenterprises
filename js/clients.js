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

      for (let i = 0; i < 2; i++) {
        clientData.forEach(client => {
          const img = document.createElement('img');
          img.src = client.src;
          img.alt = client.alt;
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
  let clientsData = [];

  // Fetch data once
  fetch('data/clients.json')
    .then(response => response.json())
    .then(data => {
      clientsData = data.clients;

      // Collect all unique categories (normalize to lowercase to avoid duplicates like "Hospitals" vs "hospitals")
      const uniqueCategories = new Set();
      clientsData.forEach(client => {
        if (Array.isArray(client.categories)) {
          client.categories.forEach(cat => uniqueCategories.add(cat.trim().toLowerCase()));
        } else if (client.category) {
          uniqueCategories.add(client.category.trim().toLowerCase());
        }
      });

      // Sort categories alphabetically for nicer UI
      const sortedCategories = Array.from(uniqueCategories).sort();

      createFilterButtons(sortedCategories);
      renderGalleries("all");
    })
    .catch(error => console.error("Error loading JSON:", error));

  function createFilterButtons(categories) {
    filterContainer.innerHTML = ''; // Clear existing buttons

    const allBtn = document.createElement("button");
    allBtn.textContent = "All";
    allBtn.dataset.category = "all";
    allBtn.classList.add("active");
    filterContainer.appendChild(allBtn);

    categories.forEach(cat => {
      const btn = document.createElement("button");
      btn.textContent = cat.charAt(0).toUpperCase() + cat.slice(1); // Capitalize first letter
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

        branch.gallery.forEach((img, index) => {
          const imgElem = document.createElement('img');
          imgElem.src = img;
          imgElem.alt = branch.name || client.alt;
          if (index >= maxVisible) imgElem.classList.add('hidden-img');
          gallery.appendChild(imgElem);
        });

        section.appendChild(title);
        section.appendChild(gallery);
        container.appendChild(section);
      });
    });
  }
});
