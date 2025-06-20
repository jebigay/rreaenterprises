// //cctv
// document.addEventListener("DOMContentLoaded", () => {
//   // Render breadcrumbs at the top
//   renderBreadcrumbs([
//     { name: "Services", link: "services.php" },
//     { name: "CCTV Surveillance", link: "services/cctv.php" }
//   ]);

//   // Load and display CCTV packages
//   fetch("data/cctv.json")
//     .then((response) => response.json())
//     .then((data) => renderCctvPackages(data.channelGroups))
//     .catch((error) => console.error("Error loading CCTV packages:", error));
// });

// function renderBreadcrumbs(crumbs) {
//   const container = document.querySelector("#bccontainer");
//   if (!container) return;

//   const breadcrumbNav = document.createElement("nav");
//   breadcrumbNav.setAttribute("aria-label", "breadcrumb");
//   breadcrumbNav.className = "breadcrumb-wrapper mb-4";

//   const breadcrumbList = document.createElement("ol");
//   breadcrumbList.className = "breadcrumb";

//   crumbs.forEach((crumb, index) => {
//     const listItem = document.createElement("li");
//     listItem.className = "breadcrumb-item";

//     if (index === crumbs.length - 1) {
//       listItem.classList.add("active");
//       listItem.setAttribute("aria-current", "page");
//       listItem.textContent = crumb.name;
//     } else {
//       const link = document.createElement("a");
//       link.href = crumb.link;
//       link.textContent = crumb.name;
//       listItem.appendChild(link);
//     }

//     breadcrumbList.appendChild(listItem);
//   });

//   breadcrumbNav.appendChild(breadcrumbList);
//   container.prepend(breadcrumbNav);
// }

// function renderCctvPackages(channelGroups) {
//   const container = document.getElementById("bccontainer");
//   if (!container) return;

//   channelGroups.forEach((group) => {
//     const div = document.createElement("div");
//     div.className = "mb-5";

//     const heading = document.createElement("h3");
//     heading.className = "div-title text-center";
//     heading.textContent = `${group.channel} Packages`;
//     div.appendChild(heading);

//     const row = document.createElement("div");
//     row.className = "row";

//     group.packages.forEach((pkg) => {
//       const col = document.createElement("div");
//       col.className = "col-12 col-sm-6 col-lg-3 d-flex align-items-stretch mb-4";

//       const card = document.createElement("div");
//       card.className = "cctv-card shadow-sm";

//       const img = document.createElement("img");
//       img.className = "card-img-top img-fluid";
//       img.src = pkg.image;
//       img.alt = `${group.channel} ${pkg.type}`;

//       const body = document.createElement("div");
//       body.className = "d-flex flex-column";

//       const title = document.createElement("h5");
//       title.className = "card-title";
//       title.textContent = `${group.channel} – ${pkg.type}`;

//       const list = document.createElement("ul");
//       list.className = "list-unstyled mt-3 mb-4";

//     //   pkg.files.forEach((file) => {
//     //     const li = document.createElement("li");
//     //     const a = document.createElement("a");
//     //     a.href = file.link;
//     //     a.target = "_blank";
//     //     a.textContent = file.name;
//     //     li.appendChild(a);
//     //     list.appendChild(li);
//     //   });

//         pkg.files.forEach((file) => {
//         const li = document.createElement("li");

//         const a = document.createElement("a");
//         a.href = file.link;
//         a.target = "_blank";
//         a.rel = "noopener noreferrer"; // Optional for security
//         a.className = "pdf-link";

//         const icon = document.createElement("img");
//         icon.src = "img/services/pdficon.svg"; // Adjust path as needed
//         icon.alt = "PDF icon";
//         icon.className = "pdf-icon";

//         a.appendChild(icon);
//         a.append(` ${file.name}`); // Space between icon and text

//         li.appendChild(a);
//         list.appendChild(li);
//         });

//       body.appendChild(title);
//       body.appendChild(list);
//       card.appendChild(img);
//       card.appendChild(body);
//       col.appendChild(card);
//       row.appendChild(col);
//     });

//     div.appendChild(row);
//     container.appendChild(div);
//   });
// }

// cctv
document.addEventListener("DOMContentLoaded", () => {
  // Render breadcrumbs at the top
  renderBreadcrumbs([
    { name: "Services", link: "services.php" },
    { name: "CCTV Surveillance", link: "services/cctv.php" }
  ]);

  // Load and display CCTV packages
  fetch("data/services_packages.json")
    .then((response) => response.json())
    .then((data) => {
      const cctvService = data.services.find(service => service.services_name === "CCTV Surveillance");
      if (cctvService) {
        renderCctvPackages(cctvService.service_channels);
      } else {
        console.error("CCTV Surveillance service not found.");
      }
    })
    .catch((error) => console.error("Error loading services-package.json:", error));
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
    heading.textContent = `${group.channel_name} Packages`;
    div.appendChild(heading);

    const channelName = group.channel_name.trim().toLowerCase();
    if (channelName === "64-channel" || channelName === "128-channel") {
      const comingSoon = document.createElement("p");
      comingSoon.className = "text-center text-muted";
      comingSoon.textContent = "Updating soon...";
      div.appendChild(comingSoon);
      container.appendChild(div);
      return;
    }

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
      img.alt = `${group.channel_name} ${pkg.type}`;

      const body = document.createElement("div");
      body.className = "d-flex flex-column";

      const title = document.createElement("h5");
      title.className = "card-title";
      title.textContent = `${group.channel_name} – ${pkg.type}`;

      // Price display logic
      const price = document.createElement("p");
      const hasDiscount = pkg.discounted_price && pkg.discounted_price !== pkg.price;

      if (hasDiscount) {
        const originalPrice = parseFloat(pkg.price.replace(/[^0-9.]/g, '')) || 0;
        const increasedPrice = originalPrice + 5000;
        price.innerHTML = `<span class="text-danger fw-bold ms-2">${pkg.discounted_price}</span>
        <span style="font-size: 16px;" class="text-muted text-decoration-line-through">₱ ${increasedPrice.toLocaleString()}.00</span>`;
      } else {
        price.className = "text-primary fw-bold";
        price.textContent = pkg.price;
      }

      const list = document.createElement("ul");
      list.className = "list-unstyled mt-3 mb-4";

      (pkg.features || []).forEach((feature) => {
        const li = document.createElement("li");

        const a = document.createElement("a");
        a.href = feature.file_link;
        a.target = "_blank";
        a.rel = "noopener noreferrer";
        a.className = "pdf-link";

        const icon = document.createElement("img");
        icon.src = "img/services/pdficon.svg";
        icon.alt = "PDF icon";
        icon.className = "pdf-icon";

        a.appendChild(icon);
        a.append(` ${feature.name}`);

        li.appendChild(a);
        list.appendChild(li);
      });

      body.appendChild(title);
      body.appendChild(price);
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


//solar
document.addEventListener("DOMContentLoaded", () => {
  // Render breadcrumbs
  renderBreadcrumbs1([
    { name: "Services", link: "services.php" },
    { name: "Solar Solutions", link: "services/solar.php" }
  ]);

  // Fetch and render solar packages from the new JSON structure
  fetch("data/services_packages.json")
    .then((response) => response.json())
    .then((data) => {
      const solarService = data.services.find(service => service.services_name === "Solar Power Systems");
      if (solarService && solarService.service_channels) {
        renderSolarPackages(solarService.service_channels);
      } else {
        console.error("No Solar Power Systems data found.");
      }
    })
    .catch((error) => console.error("Error loading solar packages:", error));
});

function renderBreadcrumbs1(crumbs) {
  const container = document.querySelector("#solar-container");
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

function renderSolarPackages(serviceChannels) {
  const container = document.getElementById("solar-container");
  if (!container) return;

  serviceChannels.forEach((channel) => {
    const div = document.createElement("div");
    div.className = "mb-5";

    const heading = document.createElement("h3");
    heading.className = "div-title text-center";
    heading.textContent = `${channel.channel_name} Packages`;
    div.appendChild(heading);

    const row = document.createElement("div");
    row.className = "row";

    channel.packages.forEach((pkg) => {
      const col = document.createElement("div");
      col.className = "col-12 col-sm-6 col-lg-4 d-flex align-items-stretch mb-4";

      const card = document.createElement("div");
      card.className = "cctv-card shadow-sm";

      const img = document.createElement("img");
      img.className = "card-img-top img-fluid";
      img.src = pkg.image;
      img.alt = `${pkg.type} ${channel.channel_name}`;

      const body = document.createElement("div");
      body.className = "d-flex flex-column p-3";

      const title = document.createElement("h5");
      title.className = "card-title-solar";
      title.innerHTML = `${pkg.type} - ${channel.channel_name}${pkg.recommendation ? ` <span style="font-weight:bold;color:green;">(${pkg.recommendation})</span>` : ''}`;

      // Price Display
      const price = document.createElement("p");
      const hasDiscount = pkg.discounted_price && pkg.discounted_price !== pkg.price;

      if (hasDiscount) {
        price.innerHTML = `<span class="text-danger fw-bold ms-2">${pkg.discounted_price}</span>
        <span style="font-size: 12px;" class="text-muted text-decoration-line-through">${pkg.price}</span>`;
      } else {
        price.className = "text-primary fw-bold";
        price.textContent = pkg.price;
      }

      // Features List
      const featureListTitle = document.createElement("p");
      featureListTitle.className = "mb-1 fw-semibold";
      featureListTitle.textContent = "Package Features:";

      const featureList = document.createElement("ul");
      featureList.className = "list-unstyled";

      pkg.features.forEach((feature) => {
        const li = document.createElement("li");
        li.innerHTML = `<span style="padding:0 10px;"> • </span><b>${feature.description}</b> - ${feature.name}`;
        featureList.appendChild(li);
      });

      // Inclusions
      const inclusionsTitle = document.createElement("p");
      inclusionsTitle.className = "mb-1 fw-semibold";
      inclusionsTitle.textContent = "Service Inclusions:";

      const inclusionList = document.createElement("ul");
      inclusionList.className = "list-unstyled";

      pkg.service_inclusions.forEach((inclusion) => {
        const li = document.createElement("li");
        li.innerHTML = `<span style="color:green; padding:0 10px;"><i class="fw-bold fa fa-check"></i></span> ${inclusion}`;
        inclusionList.appendChild(li);
      });

      // Compose card
      body.appendChild(title);
      body.appendChild(price);
      body.appendChild(featureListTitle);
      body.appendChild(featureList);
      body.appendChild(inclusionsTitle);
      body.appendChild(inclusionList);

      card.appendChild(img);
      card.appendChild(body);
      col.appendChild(card);
      row.appendChild(col);
    });

    div.appendChild(row);
    container.appendChild(div);
  });
}