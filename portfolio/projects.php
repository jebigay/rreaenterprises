<?php 
    include '../components/navbar.php';
    include '../components/header.php';
?>
<!-- Hero Section -->
<section section class="hero" style="background: url('img/projects/hero-banner.svg') center/cover no-repeat;">
  <div class="hero-overlay">
    <h2>OUR PROJECTS</h2>
    <p>Built by Passion, Powered by Innovation</p>
  </div>
</section>


<div class="page-section" id="clients">
  <div class="clients-container">
    <h2 class="services-heading">Project Gallery</h2>
    <h3 class="services-subheading">For over a decade, we've collaborated with leading national and international brands, as well as a diverse range of smaller, specialized businesses across various industries. Below is a selection of project galleries showcasing our work.</h3>
    <div id="categoryFilters" class="filters"></div>
    <div id="projects-container"></div>

  </div>
  <!-- Modal HTML -->
<div id="imageModal" class="image-modal hidden">
  <span class="modal-close">&times;</span>
  <img id="modalImage" src="" alt="Gallery Image">
  <div class="modal-controls">
    <span id="prevImage">&#10094;</span>
    <span id="nextImage">&#10095;</span>
  </div>
  <div id="modalCounter"></div>
</div>

</div>


<?php
    include '../components/footer.php'; 
?>