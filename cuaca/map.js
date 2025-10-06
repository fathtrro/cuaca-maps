// ============================================
// MAP.JS - Modul Peta Leaflet
// ============================================

let mapInstance = null;
let mapMarker = null;

function createMap(lat, lng, cityName) {
  if (mapInstance !== null) {
    mapInstance.remove();
    mapInstance = null;
    mapMarker = null;
  }

  setTimeout(() => {
    try {
      mapInstance = L.map("map", {
        center: [lat, lng],
        zoom: 11,
        scrollWheelZoom: true,
        dragging: true,
        zoomControl: true,
      });

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap",
        maxZoom: 19,
      }).addTo(mapInstance);

      const customIcon = L.icon({
        iconUrl:
          "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-violet.png",
        shadowUrl:
          "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41],
      });

      mapMarker = L.marker([lat, lng], { icon: customIcon }).addTo(mapInstance);

      mapMarker
        .bindPopup(
          `
                <div style="text-align: center; font-family: 'Poppins', sans-serif; padding: 5px;">
                    <strong style="font-size: 18px; color: #667eea;">${cityName}</strong><br/>
                    <span style="font-size: 13px; color: #64748b;">
                        📍 ${lat.toFixed(4)}°, ${lng.toFixed(4)}°
                    </span>
                </div>
            `
        )
        .openPopup();

      console.log("✅ Peta berhasil dibuat untuk:", cityName);
    } catch (error) {
      console.error("❌ Error membuat peta:", error);
    }
  }, 150);
}

function destroyMap() {
  if (mapInstance !== null) {
    mapInstance.remove();
    mapInstance = null;
    mapMarker = null;
  }
}
