(() => {
  'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
      }

      form.classList.add('was-validated')
    }, false)
  })

  // Temporary coordinates — change later when using real listing locations
    const lat = 28.7041;
    const lng = 77.1025;

    const map = L.map("map").setView([lat, lng], 12);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution: "© OpenStreetMap"
    }).addTo(map);

    L.marker([lat, lng]).addTo(map)
      // .bindPopup("<b><%= listing.title %></b><br><%= listing.location %>")
      .openPopup();

})()
