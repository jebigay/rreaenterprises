document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.querySelector(".search-input");
  const searchForm = document.querySelector(".search-form");
  const suggestionsList = document.createElement("ul");
  suggestionsList.className = "autocomplete-list";
  searchForm.appendChild(suggestionsList);

  let services = [];

  // Load services from JSON
  fetch("data/services.json")
    .then(response => response.json())
    .then(data => {
      services = data.services || [];
    })
    .catch(error => {
      console.error("Error loading services:", error);
    });

  // Match helper
  function matchService(query) {
    return services.find(service =>
      service.name.toLowerCase().includes(query) ||
      service.title.toLowerCase().includes(query) ||
      service.description.toLowerCase().includes(query)
    );
  }

  // Handle typing for autocomplete
  searchInput.addEventListener("input", () => {
    const query = searchInput.value.toLowerCase().trim();
    suggestionsList.innerHTML = "";

    if (query === "") return;

    const matches = services.filter(service =>
      service.title.toLowerCase().includes(query) ||
      service.name.toLowerCase().includes(query) ||
      service.description.toLowerCase().includes(query)
    );

    if (matches.length === 0) {
      const li = document.createElement("li");
      li.textContent = "Nothing to show.";
      li.style.color = "#888";
      li.style.cursor = "default";
      suggestionsList.appendChild(li);
      return;
    }

    matches.forEach(match => {
      const li = document.createElement("li");
      li.textContent = match.title;
      li.classList.add("autocomplete-item");
      li.addEventListener("click", () => {
        searchInput.value = match.title;
        window.location.href = match.link;
      });
      suggestionsList.appendChild(li);
    });
  });

  // Handle form submission
  searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const query = searchInput.value.toLowerCase().trim();
    const match = matchService(query);

    suggestionsList.innerHTML = "";

    if (match) {
      window.location.href = match.link;
    } else {
      const li = document.createElement("li");
      li.textContent = "Nothing to show";
      li.style.color = "#888";
      li.style.cursor = "default";
      suggestionsList.appendChild(li);
    }
  });

  // Close suggestions when clicking outside
  document.addEventListener("click", (e) => {
    if (!searchForm.contains(e.target)) {
      suggestionsList.innerHTML = "";
    }
  });
});

// document.addEventListener("DOMContentLoaded", () => {
//   const searchInput = document.querySelector(".search-input");
//   const searchForm = document.querySelector(".search-form");
//   const suggestionsList = document.createElement("ul");
//   suggestionsList.className = "autocomplete-list";
//   searchForm.appendChild(suggestionsList);

//   let services = [];

//   // Load services from JSON
//   fetch("data/services.json")
//     .then(response => response.json())
//     .then(data => {
//       services = data.services || [];
//     })
//     .catch(error => {
//       console.error("Error loading services:", error);
//     });

//   function matchesQuery(service, query) {
//     return (
//       service.name.toLowerCase().includes(query) ||
//       service.title?.toLowerCase().includes(query) ||
//       service.description?.toLowerCase().includes(query)
//     );
//   }

//   function renderSuggestions(query) {
//     suggestionsList.innerHTML = "";

//     if (query === "") return;

//     const matches = services.filter(service => matchesQuery(service, query));

//     if (matches.length === 0) {
//       const li = document.createElement("li");
//       li.textContent = "Nothing to display";
//       li.style.color = "#888";
//       li.style.cursor = "default";
//       suggestionsList.appendChild(li);
//       return;
//     }

//     matches.forEach(match => {
//       const li = document.createElement("li");
//       li.textContent = match.name;
//       li.classList.add("autocomplete-item");
//       li.addEventListener("click", () => {
//         searchInput.value = match.name;
//         window.location.href = match.link;
//       });
//       suggestionsList.appendChild(li);
//     });
//   }

//   // Handle typing for autocomplete
//   searchInput.addEventListener("input", () => {
//     const query = searchInput.value.toLowerCase().trim();
//     renderSuggestions(query);
//   });

//   // Handle form submission
//   searchForm.addEventListener("submit", (e) => {
//     e.preventDefault();
//     const query = searchInput.value.toLowerCase().trim();
//     const match = services.find(service => matchesQuery(service, query));

//     suggestionsList.innerHTML = "";

//     if (match) {
//       window.location.href = match.link;
//     } else {
//       const li = document.createElement("li");
//       li.textContent = "Nothing to display";
//       li.style.color = "#888";
//       li.style.cursor = "default";
//       suggestionsList.appendChild(li);
//     }
//   });

//   // Close suggestions when clicking outside
//   document.addEventListener("click", (e) => {
//     if (!searchForm.contains(e.target)) {
//       suggestionsList.innerHTML = "";
//     }
//   });
// });
