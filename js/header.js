document.addEventListener("DOMContentLoaded", function () {
  fetch("data/navigation.json")
    .then(response => response.json())
    .then(data => {
      const navList = document.getElementById("dynamic-navbar");
      const servicesDropdown = navList.querySelector(".dropdown");

      // Sort HOME to the top, then filter by show = true
      const sortedNav = data.navigation
        .filter(item => item.show)
        .sort((a, b) => {
          if (a.title.toUpperCase() === "HOME") return -1;
          if (b.title.toUpperCase() === "HOME") return 1;
          return 0;
        });

      const currentPage = window.location.pathname.split("/").pop().toLowerCase();

      sortedNav.forEach(item => {
        const li = document.createElement("li");
        li.className = "nav-item";

        const linkLower = item.link.toLowerCase();

        // Highlight Services if currentPage contains "services" anywhere
        let isActive = false;
        if (item.title.toLowerCase() === "services") {
          isActive = currentPage.includes("services");
        } else {
          isActive = currentPage === linkLower;
        }

        li.innerHTML = `
          <a id="${item.id}" class="nav-link js-scroll-trigger ${isActive ? 'active' : ''}" href="${item.link}">
            ${item.title}
          </a>
        `;

        navList.insertBefore(li, servicesDropdown);
      });
    })
    .catch(error => console.error("Error loading navigation:", error));
});

  

  document.addEventListener("DOMContentLoaded", function () {
    fetch("data/navigation.json")
      .then(response => response.json())
      .then(data => {
        const footerNav = document.getElementById("footer-nav");

        data.navigation.forEach(item => {
          const li = document.createElement("li");
          const a = document.createElement("a");
          a.href = item.link;
          a.textContent = item.title;
          li.appendChild(a);
          footerNav.appendChild(li);
        });
      })
      .catch(error => console.error("Error loading footer nav:", error));
  });

  //portfolio dropdown
  document.addEventListener("DOMContentLoaded", function () {
    // Target the Portfolio dropdown container
    const portfolioMenu = document.getElementById("portfolioMenu");

    // Fetch the navigation data from JSON
    fetch("data/navigation.json")
      .then(response => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then(data => {
        const navItems = data.navigation;

        // Only include IDs 3 and 6
        const targetIDs = ["3", "6"];
        const filteredItems = navItems.filter(item => targetIDs.includes(item.id));

        // Create dropdown links
        filteredItems.forEach(item => {
          const link = document.createElement("a");
          link.className = "dropdown-item";
          link.href = item.link;
          link.textContent = item.title;
          portfolioMenu.appendChild(link);
        });
      })
      .catch(error => {
        console.error("Failed to load navigation data:", error);
      });
  });