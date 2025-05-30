<?php 
    include 'components/navbar.php';
    include 'components/header.php';
?>
<section class="contact-hero">
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
    <label for="attachments" class="form-label">Upload Attachments</label><br>
    <input
      type="file"
      class="form-control"
      id="attachments"
      name="attachments[]"
      accept="image/*,application/pdf"
      multiple
      style="height: inherit;"
    />
    <label for="attachments" style="color: #6c757d;font-size:80%;"><b>Note: </b>Please make sure all your uploaded documents are saved as PDF. This only sends images and PDF files.</label>
  </div>

  <button type="submit" class="btn btn-primary btn-xl js-scroll-trigger">Submit</button>
</form>

    <div id="success"></div>
    <div class="mt-5">
      <iframe
        class="google-map"
        src="https://www.google.com/maps?q=14.181171,121.126036&z=17&output=embed"
        allowfullscreen=""
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade">
      </iframe>
    </div>
  </section>

<?php
    include 'components/footer.php'; 
?>