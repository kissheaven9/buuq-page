/* Karte: lädt Leaflet und OpenStreetMap erst nach Klick auf „Karte laden“ (Datenschutz). */
(function () {
  var box = document.getElementById('map'), btn = document.getElementById('mapLoad');
  if (!box || !btn) return;
  btn.addEventListener('click', function () {
    btn.disabled = true;
    var lat = parseFloat(box.dataset.lat), lon = parseFloat(box.dataset.lon);
    var css = document.createElement('link');
    css.rel = 'stylesheet'; css.href = 'assets/vendor/leaflet/leaflet.css';
    document.head.appendChild(css);
    var js = document.createElement('script');
    js.src = 'assets/vendor/leaflet/leaflet.js';
    js.onload = function () {
      box.innerHTML = '<div class="map__canvas" id="mapCanvas"></div>' +
        '<a class="map__link" target="_blank" rel="noopener noreferrer" href="https://www.openstreetmap.org/?mlat=' + lat + '&mlon=' + lon + '#map=15/' + lat + '/' + lon + '">In OpenStreetMap öffnen</a>';
      var Lf = window.L;
      Lf.Icon.Default.imagePath = 'assets/vendor/leaflet/images/';
      var map = Lf.map('mapCanvas', { scrollWheelZoom: false }).setView([lat, lon], 14);
      Lf.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>' }).addTo(map);
      Lf.marker([lat, lon]).addTo(map).bindPopup('<b>' + box.dataset.name + '</b><br>' + box.dataset.adr).openPopup();
    };
    js.onerror = function () { btn.disabled = false; };
    document.head.appendChild(js);
  });
})();
