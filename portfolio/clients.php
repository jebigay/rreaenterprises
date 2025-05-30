<?php 
    include '../components/navbar.php';
    include '../components/header.php';
?>
<!-- Hero Section -->
<section class="clients-hero">
  <div class="hero-overlay">
    <h2>OUR CLIENTS</h2>
    <p>Built by Passion, Powered by Innovation</p>
  </div>
</section>


<div class="page-section" id="clients">
  <div class="clients-container">
    <h2 class="services-heading">Our Valued Clients</h2>
    <h3 class="services-subheading">For over a decade, we've partnered with prominent national and international brands, along with a wide array of smaller, niche businesses across various industries. Below is a list of our valued clients.</h3>

    <div class="filters">
      <button data-category="all" class="active">All</button>
      <button data-category="government">Government</button>
      <button data-category="school">Schools</button>
      <button data-category="hospital">Hospitals</button>
      <button data-category="international">International</button>
      <button data-category="residential">Residentials</button>
      <button data-category="eventplace">Event Places</button>
      <button data-category="other">Others</button>
    </div>

    <div class="clients-grid" id="clientsGrid"></div>
  </div>
</div>


<?php
    include '../components/footer.php'; 
?>