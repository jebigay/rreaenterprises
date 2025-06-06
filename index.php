<?php 
    ini_set('display_errors', 1); ini_set('display_startup_errors', 1); error_reporting(E_ALL); 
    
    include 'components/navbar.php';
    include 'components/header.php';
?>
<!-- Header -->
  <header class="masthead">
    <div class="container two-column">
      <div class="intro-text">
        <div class="intro-heading">Built by Passion, Powered by Innovation</div>
        <div class="intro-lead-in">
          With a comprehensive range of services, RREA Enterprises can guarantee your technology needs are not just met, but exceeded.
          We work closely with our clients to create customized plans that are seamlessly integrated, effective and sustainable for many years to come.
          Reach out today to see how we can help.
          The best talents in these industry are not at the biggest agencies or companies.
          We are a team of young, creative, focused and devoted Professionals that believe in creating the highest level of craftsmanship.
        </div>
        <a class="btn btn-primary btn-xl-getstarted js-scroll-trigger" href="contactus.php">Get Started <i class="fas fa-arrow-right"></i></a>
      </div>
      <div class="intro-image">
        <video width="100%" controls autoplay muted loop playsinline controlslist="nodownload" preload="none" oncontextmenu="return false">
          <source src="img/homepage/hero-banner.mp4" type="video/mp4" class="hero-img">
        </video>
      </div>
    </div>
  </header>

  <!-- Services -->
  <section class="page-section" id="services">
    <div class="container">
      <div class="row">
        <div class="col-lg-12 text-center">
          <h2 class="section-heading">How can we help you?</h2>
          <h3 class="section-subheading">Here are some of the services that we offer</h3>
        </div>
      </div>
      <div class="row text-center" id="servicesList"></div>
      <div class="row mt-4">
        <div class="col text-center">
          <a href="services.php" class="btn btn-primary btn-xl js-scroll-trigger">View All Services</a>
        </div>
      </div>
    </div>
  </section>

  <!-- Our Clients Section -->
<section class="page-section even" id="clients">
  <div class="container">
    <div class="row justify-content-center mb-4">
      <div class="col-lg-12 text-center">
        <h2 class="section-heading">Featured Clients</h2>
      </div>
    </div>
    <div class="client-logos-container">
      <div class="client-logos-track" id="clientLogos"></div>
    </div>
  </div>
  <div class="client-button text-center">
    <a href="portfolio/clients.php" class="btn btn-primary btn-xl js-scroll-trigger">View All Clients</a>
  </div>
</section>

<!-- Client Feedbacks Section -->
<section class="page-section" id="feedbacks">
  <div class="row justify-content-center mb-4">
    <div class="col-lg-12 text-center">
      <h2 class="section-heading">Client Feedbacks</h2>
    </div>
  </div>
  <div class="carousel-container">
    <img src="img/clients/arrow-left.svg" class="carousel-btn left" onclick="moveSlide(-1)"/>
    <div class="carousel" id="carousel">
    </div>
    <img src="img/clients/arrow-right.svg" class="carousel-btn right" onclick="moveSlide(1)"/>
  </div>
  
</section>
<!-- Contact -->
<section class="page-section" id="contact">
<div class="contact-section-home">
  <div class="container" id="contact-section">
    <div class="contact-wrapper">
      <div class="contact-text">
        <div class="row justify-content-center mb-4">
          <div class="col-lg-12 text-left">
            <h2 class="intro-heading">Contact Us Form</h2>
          </div>
        </div>
        <p class="intro-lead-in">
          Whether you need expert assistance with QuickBooks setup and accounting, CCTV installation for enhanced security, solar panel solutions for energy efficiency, website development to grow your online presence, reliable computer repair services, or Windows Server configuration for your business infrastructure — our team is ready to help. <br>Contact us today to discuss how we can support your specific needs and ensure your technology and systems run smoothly and efficiently.
        </p>
      </div>
      <div class="contact-form">
        <form id="contactForm" name="sentMessage" enctype="multipart/form-data" method="POST" novalidate>
          <input type="text" id="name" name="name" placeholder="Your name *" required />
          <input type="email" id="email" name="email" placeholder="Your email *" required />
          <input type="phone" id="phone" name="phone" placeholder="Your contact number *" required />
          <textarea id="message" name="message" placeholder="Your message *" required></textarea>
          <input label="Upload Attachments (Please make sure all your documents are saved as PDF)" type="file" name="attachments[]" accept="image/*,application/pdf" multiple />
          <label for="attachments" style="color: #6c757d;font-size:80%;"><b>Note: </b>Please make sure all your uploaded documents are saved as PDF. This only sends images and PDF files.</label>
          <button class="btn btn-primary btn-xl js-scroll-trigger" type="submit">Submit</button>
        </form>
        <div id="success"></div>
      </div>
    </div>
  </div>
  </div>
</section>

<?php
    include 'components/footer.php'; 
?>