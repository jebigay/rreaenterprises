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

  // Handle typing for autocomplete
  searchInput.addEventListener("input", () => {
    const query = searchInput.value.toLowerCase().trim();
    suggestionsList.innerHTML = "";

    if (query === "") return;

    const matches = services.filter(service =>
      service.name.toLowerCase().includes(query)
    );

    if (matches.length === 0) {
      const li = document.createElement("li");
      li.textContent = "Nothing to display";
      li.style.color = "#888";
      li.style.cursor = "default";
      suggestionsList.appendChild(li);
      return;
    }

    matches.forEach(match => {
      const li = document.createElement("li");
      li.textContent = match.name;
      li.classList.add("autocomplete-item");
      li.addEventListener("click", () => {
        searchInput.value = match.name;
        window.location.href = match.link;
      });
      suggestionsList.appendChild(li);
    });
  });

  // Handle form submission
  searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const query = searchInput.value.toLowerCase().trim();
    const match = services.find(service =>
      service.name.toLowerCase() === query
    );

    suggestionsList.innerHTML = "";

    if (match) {
      window.location.href = match.link;
    } else {
      const li = document.createElement("li");
      li.textContent = "Nothing to display";
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

//   // Render suggestions
//   const renderSuggestions = (items) => {
//     suggestionsList.innerHTML = "";

//     if (items.length === 0) {
//       const li = document.createElement("li");
//       li.textContent = "Nothing to display";
//       li.style.color = "#888";
//       li.style.cursor = "default";
//       suggestionsList.appendChild(li);
//       return;
//     }

//     items.forEach(item => {
//       const li = document.createElement("li");
//       li.textContent = item.name;
//       li.classList.add("autocomplete-item");
//       li.addEventListener("click", () => {
//         searchInput.value = item.name;
//         window.location.href = item.link;
//       });
//       suggestionsList.appendChild(li);
//     });
//   };

//   // Show all on focus if input is empty
//   searchInput.addEventListener("focus", () => {
//     if (searchInput.value.trim() === "") {
//       renderSuggestions(services);
//     }
//   });

//   // Handle typing for autocomplete
//   searchInput.addEventListener("input", () => {
//     const query = searchInput.value.toLowerCase().trim();
//     if (query === "") {
//       renderSuggestions([]);
//       return;
//     }

//     const matches = services.filter(service =>
//       service.name.toLowerCase().includes(query)
//     );
//     renderSuggestions(matches);
//   });

//   // Handle form submission
//   searchForm.addEventListener("submit", (e) => {
//     e.preventDefault();
//     const query = searchInput.value.toLowerCase().trim();
//     const match = services.find(service =>
//       service.name.toLowerCase() === query
//     );

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
