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
  const buttons = document.querySelectorAll(".filters button");
  let clientsData = [];

  // Load JSON data
  fetch("data/clients.json")
    .then(response => response.json())
    .then(data => {
      clientsData = data.clients;
      renderClients("all");
    })
    .catch(error => console.error("Error loading JSON:", error));

  // Render clients by category
  function renderClients(category) {
    clientsGrid.innerHTML = "";

    const filtered = category === "all"
      ? clientsData
      : clientsData.filter(c => c.category === category);

    filtered.forEach(client => {
      const img = document.createElement("img");
      img.src = client.src;
      img.alt = client.alt;
      clientsGrid.appendChild(img);
    });
  }

  // Filter button event listeners
  buttons.forEach(button => {
    button.addEventListener("click", () => {
      buttons.forEach(btn => btn.classList.remove("active"));
      button.classList.add("active");
      renderClients(button.dataset.category);
    });
  });
});

//portfolio
fetch('data/projects.json')
      .then(response => response.json())
      .then(data => {
        const container = document.getElementById('projects-container');
        data.projects.forEach(project => {
          const section = document.createElement('div');
          section.className = 'project-section';

          const title = document.createElement('h3');
          title.className = 'div-title';
          title.textContent = project.title;

          const gallery = document.createElement('div');
          gallery.className = 'div-title project-gallery';

          project.images.forEach(img => {
            const imgElem = document.createElement('img');
            imgElem.src = img;
            imgElem.alt = project.title;
            gallery.appendChild(imgElem);
          });

          section.appendChild(title);
          section.appendChild(gallery);
          container.appendChild(section);
        });
      });
