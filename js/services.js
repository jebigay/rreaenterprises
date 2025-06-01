document.addEventListener("DOMContentLoaded", () => {
  fetch('data/services.json')
    .then(response => {
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
      return response.json();
    })
    .then(data => {
      const servicesMenu = document.getElementById('servicesMenu');
      if (!servicesMenu) return;

      data.services.forEach(service => {
        const a = document.createElement('a');
        a.className = 'dropdown-item';
        a.href = service.link;
        a.textContent = service.title;
        servicesMenu.appendChild(a);
      });
    })
    .catch(error => console.error('Error loading services:', error));
});

document.addEventListener("DOMContentLoaded", function () {
  fetch('data/services.json')
    .then(response => {
      if (!response.ok) throw new Error(`Failed to fetch services: ${response.status}`);
      return response.json();
    })
    .then(data => {
      const serviceList = document.getElementById('footerServices');
      if (!serviceList) return;

      data.services.forEach(service => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = service.link;
        a.textContent = service.name;
        li.appendChild(a);
        serviceList.appendChild(li);
      });
    })
    .catch(error => console.error('Error loading services:', error));
});

document.addEventListener("DOMContentLoaded", function () {
  fetch("data/services.json")
    .then(response => response.json())
    .then(data => {
      const container = document.getElementById("servicesList");
      data.services.forEach(service => {
        if (service.show) {
          const isMobile = window.innerWidth <= 768;
          const col = document.createElement("div");
          if (isMobile) {
            col.className = "col-12 mb-4"; // Full width on mobile
          } else {
            col.className = "col-md-4 mb-4"; // 3 columns per row on desktop
          }
          // col.className = "col-md-4 mb-4";
          col.innerHTML = `
            <a href="${service.link}" class="text-decoration-none text-dark d-flex flex-column h-100" style="background-color: white; border-radius: 10px;">
              <img oncontextmenu="return false;" draggable="false" src="${service.image}" alt="${service.title} Image" class="mb-3 service-image" />
              <h4 class="service-heading">${service.name}</h4>
              <p class="service-subheading">${service.description}</p>
            </a>
          `;
          container.appendChild(col);
        }
      });
    })
    .catch(error => console.error("Failed to load services:", error));
});


document.addEventListener("DOMContentLoaded", function () {
  fetch("data/services.json")
    .then(response => response.json())
    .then(data => {
      const container = document.getElementById("servicesList-services");
      data.services.forEach(service => {
          const isMobile = window.innerWidth <= 768;
          const col = document.createElement("div");
          if (isMobile) {
            col.className = "col-12 mb-4"; // Full width on mobile
          } else {
            col.className = "col-md-4 mb-4"; // 3 columns per row on desktop
          }
          // col.className = "col-md-4 mb-4";
          col.innerHTML = `
            <a href="${service.link}" class="text-decoration-none text-dark d-flex flex-column h-100" style="background-color: white; border-radius: 10px;">
            <img oncontextmenu="return false;" draggable="false" src="${service.image}" alt="${service.title} Image" class="mb-3 service-image" />
            <h4 class="service-heading">${service.title}</h4>
            <p class="service-subheading">${service.description}</p>

            <div class="d-flex justify-content-center mt-auto">
                <button class="services-btn btn-primary btn-xl js-scroll-trigger">Learn More</button>
            </div>
            </a>
          `;
          container.appendChild(col);
      });
    })
    .catch(error => console.error("Failed to load services:", error));
});