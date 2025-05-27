//cctv
document.addEventListener("DOMContentLoaded", () => {
  // Render breadcrumbs at the top
  renderBreadcrumbs([
    { name: "Services", link: "services.php" },
    { name: "CCTV Surveillance", link: "services/cctv.php" }
  ]);

  // Load and display CCTV packages
  fetch("data/cctv.json")
    .then((response) => response.json())
    .then((data) => renderCctvPackages(data.channelGroups))
    .catch((error) => console.error("Error loading CCTV packages:", error));
});

function renderBreadcrumbs(crumbs) {
  const container = document.querySelector("#bccontainer");
  if (!container) return;

  const breadcrumbNav = document.createElement("nav");
  breadcrumbNav.setAttribute("aria-label", "breadcrumb");
  breadcrumbNav.className = "breadcrumb-wrapper mb-4";

  const breadcrumbList = document.createElement("ol");
  breadcrumbList.className = "breadcrumb";

  crumbs.forEach((crumb, index) => {
    const listItem = document.createElement("li");
    listItem.className = "breadcrumb-item";

    if (index === crumbs.length - 1) {
      listItem.classList.add("active");
      listItem.setAttribute("aria-current", "page");
      listItem.textContent = crumb.name;
    } else {
      const link = document.createElement("a");
      link.href = crumb.link;
      link.textContent = crumb.name;
      listItem.appendChild(link);
    }

    breadcrumbList.appendChild(listItem);
  });

  breadcrumbNav.appendChild(breadcrumbList);
  container.prepend(breadcrumbNav);
}

function renderCctvPackages(channelGroups) {
  const container = document.getElementById("bccontainer");
  if (!container) return;

  channelGroups.forEach((group) => {
    const div = document.createElement("div");
    div.className = "mb-5";

    const heading = document.createElement("h3");
    heading.className = "div-title text-center";
    heading.textContent = `${group.channel} Packages`;
    div.appendChild(heading);

    const row = document.createElement("div");
    row.className = "row";

    group.packages.forEach((pkg) => {
      const col = document.createElement("div");
      col.className = "col-12 col-sm-6 col-lg-3 d-flex align-items-stretch mb-4";

      const card = document.createElement("div");
      card.className = "cctv-card shadow-sm";

      const img = document.createElement("img");
      img.className = "card-img-top img-fluid";
      img.src = pkg.image;
      img.alt = `${group.channel} ${pkg.type}`;

      const body = document.createElement("div");
      body.className = "d-flex flex-column";

      const title = document.createElement("h5");
      title.className = "card-title";
      title.textContent = `${group.channel} – ${pkg.type}`;

      const list = document.createElement("ul");
      list.className = "list-unstyled mt-3 mb-4";

    //   pkg.files.forEach((file) => {
    //     const li = document.createElement("li");
    //     const a = document.createElement("a");
    //     a.href = file.link;
    //     a.target = "_blank";
    //     a.textContent = file.name;
    //     li.appendChild(a);
    //     list.appendChild(li);
    //   });

        pkg.files.forEach((file) => {
        const li = document.createElement("li");

        const a = document.createElement("a");
        a.href = file.link;
        a.target = "_blank";
        a.rel = "noopener noreferrer"; // Optional for security
        a.className = "pdf-link";

        const icon = document.createElement("img");
        icon.src = "img/services/pdficon.svg"; // Adjust path as needed
        icon.alt = "PDF icon";
        icon.className = "pdf-icon";

        a.appendChild(icon);
        a.append(` ${file.name}`); // Space between icon and text

        li.appendChild(a);
        list.appendChild(li);
        });

      body.appendChild(title);
      body.appendChild(list);
      card.appendChild(img);
      card.appendChild(body);
      col.appendChild(card);
      row.appendChild(col);
    });

    div.appendChild(row);
    container.appendChild(div);
  });
}
