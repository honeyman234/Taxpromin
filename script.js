
  //const res = await fetch("data.json");
  //const data = await res.json();

  const list = document.getElementById("list");
  const search = document.getElementById("search");

  const cityFilter = document.getElementById("cityFilter");
  const certFilter = document.getElementById("certFilter");
  const serviceFilter = document.getElementById("serviceFilter");

  // -------- Populate filter dropdowns automatically ----------
  const cities = [...new Set(data.map(p => p.city))];
  const certs = [...new Set(data.map(p => p.certification))];
  const services = [...new Set(data.flatMap(p => p.services.split(",").map(s => s.trim())))];

  cities.forEach(c => cityFilter.innerHTML += `<option value="${c}">${c}</option>`);
  certs.forEach(c => certFilter.innerHTML += `<option value="${c}">${c}</option>`);
  services.forEach(s => serviceFilter.innerHTML += `<option value="${s}">${s}</option>`);

  // -------------- Render cards -----------------
  function render(items) {
    list.innerHTML = "";

    if(items.length === 0){
      list.innerHTML = `<p class="text-muted">No professionals match your search/filters.</p>`;
      return;
    }

    items.forEach(p => {
      const col = document.createElement("div");
      col.className = "col-md-4 mb-3";

      col.innerHTML = `
        <div class="card shadow-sm h-100">

          <img src="${p.photo}" class="profile-img" alt="${p.name}">

          <div class="card-body">

            <h5 class="card-title">
              ${p.name}
              ${p.verified ? '<span class="badge badge-verified ms-2">Verified</span>' : ''}
            </h5>

            <p class="card-text">
              <strong>City:</strong> ${p.city}<br>
              <strong>Certification:</strong> ${p.certification}<br>
              <strong>Experience:</strong> ${p.experience}<br>
              <strong>Services:</strong> ${p.services}
            </p>

            <a href="tel:${p.phone}" class="btn btn-sm btn-outline-dark">
              <i class="bi bi-telephone"></i> Call
            </a>

            <a href="${p.whatsapp}" target="_blank" class="btn btn-sm" style="background:#25D366; color:white;">
              <i class="bi bi-whatsapp"></i> WhatsApp
            </a>
            <a href="${p.facebook}" target="_blank" class="btn btn-sm" style="background:#0000ff; color:white;">
              <i class="bi bi-facebook"></i> Facebook
            </a>

          </div>
        </div>
      `;
      list.appendChild(col);
    });
  }

  function applyFilters(){
    const q = search.value.toLowerCase();
    const city = cityFilter.value;
    const cert = certFilter.value;
    const service = serviceFilter.value;

    const filtered = data.filter(p => {

      const matchesSearch =
        p.name.toLowerCase().includes(q) ||
        p.services.toLowerCase().includes(q) ||
        p.city.toLowerCase().includes(q);

      const matchesCity = city === "" || p.city === city;
      const matchesCert = cert === "" || p.certification === cert;
      const matchesService =
        service === "" || p.services.toLowerCase().includes(service.toLowerCase());

      return matchesSearch && matchesCity && matchesCert && matchesService;
    });

    render(filtered);
  }

  // initial render
  render(data);

  // events
  search.addEventListener("input", applyFilters);
  cityFilter.addEventListener("change", applyFilters);
  certFilter.addEventListener("change", applyFilters);
  serviceFilter.addEventListener("change", applyFilters);


//loadData();
