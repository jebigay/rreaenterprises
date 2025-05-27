document.addEventListener("DOMContentLoaded", () => {
    fetch('data/about.json')
      .then((response) => response.json())
      .then((data) => {
        const aboutData = data.company_profile;
        const aboutSection = document.getElementById("about-section");
  
        // Image and stats from the first section (assumed Introduction)
        const { image, stats } = aboutData[0];
        const imageHTML = `
          <div class="about-image">
            <img src="${image}" alt="About RREA" />
            <div class="stats">
              ${stats.map(stat => `
                <div class="stat-box">
                  <h3>${stat.value}</h3>
                  <p>${stat.label}</p>
                </div>
              `).join("")}
            </div>
          </div>
        `;
  
        // Build the rest of the text content
        let textHTML = '<div class="about-text">';
  
        aboutData.forEach(section => {
          textHTML += `<h4>${section.title}</h4>`;
          section.paragraphs.forEach(para => {
            textHTML += `<p>${para}</p>`;
          });
  
          // If list is available (for "What's our goal?")
          if (section.list_items) {
            textHTML += `<ul><li>${section.list_title}</li>`;
            section.list_items.forEach(item => {
              textHTML += `<li>${item}</li>`;
            });
            textHTML += '</ul>';
          }
  
          if (section.conclusion) {
            textHTML += `<p>${section.conclusion}</p>`;
          }
        });
  
        textHTML += '</div>';
  
        aboutSection.innerHTML = imageHTML + textHTML;
      })
      .catch(error => {
        console.error("Error loading About data:", error);
      });
  });
  