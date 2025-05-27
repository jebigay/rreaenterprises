<?php 
    include 'components/navbar.php';
    include 'components/header.php';
?>
<section class="hero">
  <div class="hero-overlay">
    <h2>CONTACT US</h2>
    <p>Built by Passion, Powered by Innovation</p>
  </div>
</section>

  <section class="contact-section bg-white rounded shadow-sm mt-4 mb-5">
    <h3 class="fw-bold mb-2">Connect With Our Team</h3>
    <p class="contact-text-muted mb-4">
          Whether you need expert assistance with QuickBooks setup and accounting, CCTV installation for enhanced security, solar panel solutions for energy efficiency, website development to grow your online presence, reliable computer repair services, or Windows Server configuration for your business infrastructure — our team is ready to help. <br>
          Contact us today to discuss how we can support your specific needs and ensure your technology and systems run smoothly and efficiently.
    </p>

    <form id="contactForm" name="sentMessage" enctype="multipart/form-data" novalidate>
  <div class="mb-3">
    <label for="name" class="form-label">Full Name <span class="text-danger">*</span></label>
    <input type="text" name="name" class="form-control" id="name" required>
  </div>

  <div class="mb-3">
    <label for="email" class="form-label">Email Address <span class="text-danger">*</span></label>
    <input type="email" name="email" class="form-control" id="email" required>
  </div>

  <div class="mb-3">
    <label for="contactNumber" class="form-label">Contact Number <span class="text-danger">*</span></label>
    <input type="tel" name="phone" class="form-control" id="phone" required>
  </div>

  <div class="mb-4">
    <label for="message" class="form-label">Message <span class="text-danger">*</span></label>
    <textarea name="message" class="form-control" id="message" rows="5" required></textarea>
  </div>

  <!-- File upload field -->
  <div class="mb-4">
    <label for="attachments" class="form-label">Upload Attachments</label>
    <input
      type="file"
      class="form-control"
      id="attachments"
      name="attachments[]"
      accept="image/*,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      multiple
      style="height: inherit;"
    />
  </div>

  <button type="submit" class="btn btn-primary btn-xl js-scroll-trigger">Submit</button>
</form>

    <div id="success"></div>
    <div class="mt-5">
      <iframe
        class="google-map"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3878.039291464304!2d121.16279331483806!3d14.18805929003648!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33bd6334b2b11cc1%3A0x8f16e1b2657b46fa!2sRUC%20Calamba!5e0!3m2!1sen!2sph!4v1626277413036!5m2!1sen!2sph"
        allowfullscreen=""
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade">
      </iframe>
    </div>
  </section>

<?php
    include 'components/footer.php'; 
?>