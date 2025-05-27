document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");
  const result = document.getElementById("success");
  const submitBtn = form.querySelector("button[type='submit']");
  const originalBtnText = submitBtn.innerHTML;

  const requiredFields = ['name', 'email', 'message', 'phone'];

  // Highlight required fields on submit
  function highlightInvalidFields() {
    let valid = true;
    requiredFields.forEach(id => {
      const field = document.getElementById(id);
      if (!field.value.trim()) {
        field.classList.add("is-invalid");
        valid = false;
      }
    });
    return valid;
  }

  // Remove error on typing
  requiredFields.forEach(id => {
    const field = document.getElementById(id);
    field.addEventListener("input", () => {
      field.classList.remove("is-invalid");
    });
  });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    result.innerHTML = '';

    if (!highlightInvalidFields()) {
      result.innerHTML = `<p style="color: red">Please fill in all required fields.</p>`;
      return;
    }

    const formData = new FormData(form);

    // Show loading state
    submitBtn.disabled = true;
    submitBtn.innerHTML = 'Sending…';

    try {
      const response = await fetch("components/contact_me.php", {
        method: "POST",
        body: formData,
      });

      const raw = await response.text();

      try {
        const data = JSON.parse(raw);
        const color = data.status === "error" ? "red" : "green";
        result.innerHTML = `<p style="color: ${color}">${data.message}</p>`;

        if (data.status === "success") {
          form.reset();
        }
      } catch (jsonError) {
        console.error("Raw response (not JSON):", raw);
        result.innerHTML = `<p style="color: red">Server error: Invalid response.</p>`;
      }
    } catch (err) {
      console.error("Network error:", err);
      result.innerHTML = `<p style="color: red">An error occurred. Try again later.</p>`;
    }

    // Restore button
    submitBtn.disabled = false;
    submitBtn.innerHTML = originalBtnText;
  });
});
