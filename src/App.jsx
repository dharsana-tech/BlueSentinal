import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

function App() {
  const reefLocations = [
    {
      name: "Reef Area A",
      position: [9.9312, 76.2673],
      risk: "HIGH",
      temperature: 31,
      pollution: 3,
      reason: "Environmental anomaly detected",
    },
    {
      name: "Reef Area B",
      position: [9.5, 76.4],
      risk: "CAUTION",
      temperature: 29,
      pollution: 1,
      reason: "Moderate environmental changes",
    },
    {
      name: "Reef Area C",
      position: [8.0883, 77.5385],
      risk: "SAFE",
      temperature: 27,
      pollution: 0,
      reason: "No major anomaly detected",
    },
  ];

  return (
    <div>
      <h1>🌊 Reef Rescue Risk Map</h1>

      <MapContainer
        center={[9.3, 76.8]}
        zoom={7}
        style={{ height: "600px", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {reefLocations.map((location, index) => (
          <Marker key={index} position={location.position}>
            <Popup>
              <h3>{location.name}</h3>
              <p><b>Risk:</b> {location.risk}</p>
              <p><b>Temperature:</b> {location.temperature}°C</p>
              <p><b>Pollution Reports:</b> {location.pollution}</p>
              <p><b>Reason:</b> {location.reason}</p>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

export default App;