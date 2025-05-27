let currentSlide = 0;

    function moveSlide(direction) {
      const carousel = document.getElementById("carousel");
      const slides = document.querySelectorAll(".testimonial");
      const total = slides.length;

      currentSlide = (currentSlide + direction + total) % total;
      const offset = -currentSlide * 100;
      carousel.style.transform = `translateX(${offset}%)`;
    }

window.addEventListener("load", () => {
  const testimonials = document.querySelectorAll(".testimonial-content");
  let maxHeight = 0;

  testimonials.forEach(el => {
    maxHeight = Math.max(maxHeight, el.offsetHeight);
  });

  testimonials.forEach(el => {
    el.style.height = maxHeight + "px";
  });
});