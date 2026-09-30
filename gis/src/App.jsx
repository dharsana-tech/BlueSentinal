import { useState, Fragment } from "react";

import {
  MapContainer,
  TileLayer,
  CircleMarker,
  Circle,
  Popup,
  LayersControl,
} from "react-leaflet";

import "leaflet/dist/leaflet.css";

function App() {
  const reefLocations = [
    {
      name: "Reef Area A",
      position: [9.9312, 76.2673],
      risk: "HIGH",
      riskScore: 87,
      temperature: 31,
      pollution: 3,
      reason: "Environmental anomaly detected",
      reefArea: "125 km²",
      anomaly: "High temperature and pollution indicators",
      lastUpdated: "Today",
    },
    {
      name: "Reef Area B",
      position: [9.5, 76.4],
      risk: "CAUTION",
      riskScore: 54,
      temperature: 29,
      pollution: 1,
      reason: "Moderate environmental changes",
      reefArea: "98 km²",
      anomaly: "Moderate environmental variation",
      lastUpdated: "Today",
    },
    {
      name: "Reef Area C",
      position: [8.0883, 77.5385],
      risk: "SAFE",
      riskScore: 18,
      temperature: 27,
      pollution: 0,
      reason: "No major anomaly detected",
      reefArea: "110 km²",
      anomaly: "No significant anomaly",
      lastUpdated: "Today",
    },
  ];

  const [selectedRisk, setSelectedRisk] = useState("ALL");
  const [selectedLocation, setSelectedLocation] = useState(null);

  const getColor = (risk) => {
    if (risk === "HIGH") return "red";
    if (risk === "CAUTION") return "yellow";
    return "green";
  };

  const getRiskEmoji = (risk) => {
    if (risk === "HIGH") return "🔴";
    if (risk === "CAUTION") return "🟡";
    return "🟢";
  };

  const filteredLocations =
    selectedRisk === "ALL"
      ? reefLocations
      : reefLocations.filter(
          (location) => location.risk === selectedRisk
        );

  const cardStyle = {
    backgroundColor: "white",
    padding: "15px 30px",
    borderRadius: "10px",
    textAlign: "center",
    boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
    minWidth: "130px",
  };

  const filterButtonStyle = {
    padding: "10px 18px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    cursor: "pointer",
    fontWeight: "bold",
    backgroundColor: "white",
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f4f8fb",
        padding: "20px",
        boxSizing: "border-box",
      }}
    >
      {/* HEADER */}

      <h1
        style={{
          textAlign: "center",
          color: "#064663",
          marginBottom: "10px",
        }}
      >
        🌊 Reef Rescue Risk Map
      </h1>

      <p
        style={{
          textAlign: "center",
          color: "#555",
          marginBottom: "25px",
        }}
      >
        AI-Powered Coastal & Coral Reef Environmental Monitoring
      </p>

      {/* RISK SUMMARY */}

      <div
        style={{
          display: "flex",
          gap: "15px",
          justifyContent: "center",
          marginBottom: "20px",
          flexWrap: "wrap",
        }}
      >
        <div style={cardStyle}>
          <div style={{ fontSize: "25px" }}>🟢</div>
          <b>SAFE</b>
          <br />
          {
            reefLocations.filter(
              (location) => location.risk === "SAFE"
            ).length
          }{" "}
          Location
        </div>

        <div style={cardStyle}>
          <div style={{ fontSize: "25px" }}>🟡</div>
          <b>CAUTION</b>
          <br />
          {
            reefLocations.filter(
              (location) => location.risk === "CAUTION"
            ).length
          }{" "}
          Location
        </div>

        <div style={cardStyle}>
          <div style={{ fontSize: "25px" }}>🔴</div>
          <b>HIGH RISK</b>
          <br />
          {
            reefLocations.filter(
              (location) => location.risk === "HIGH"
            ).length
          }{" "}
          Location
        </div>
      </div>

      {/* FILTER */}

      <div
        style={{
          backgroundColor: "white",
          padding: "15px",
          borderRadius: "10px",
          marginBottom: "20px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
          textAlign: "center",
        }}
      >
        <h3
          style={{
            marginTop: "0",
            color: "#064663",
          }}
        >
          🔍 Filter Risk Locations
        </h3>

        <div
          style={{
            display: "flex",
            gap: "10px",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <button
            onClick={() => setSelectedRisk("ALL")}
            style={{
              ...filterButtonStyle,
              backgroundColor:
                selectedRisk === "ALL" ? "#064663" : "white",
              color:
                selectedRisk === "ALL" ? "white" : "#333",
            }}
          >
            All Locations
          </button>

          <button
            onClick={() => setSelectedRisk("SAFE")}
            style={{
              ...filterButtonStyle,
              backgroundColor:
                selectedRisk === "SAFE" ? "green" : "white",
              color:
                selectedRisk === "SAFE" ? "white" : "#333",
            }}
          >
            🟢 SAFE
          </button>

          <button
            onClick={() => setSelectedRisk("CAUTION")}
            style={{
              ...filterButtonStyle,
              backgroundColor:
                selectedRisk === "CAUTION" ? "#d6b900" : "white",
              color:
                selectedRisk === "CAUTION" ? "white" : "#333",
            }}
          >
            🟡 CAUTION
          </button>

          <button
            onClick={() => setSelectedRisk("HIGH")}
            style={{
              ...filterButtonStyle,
              backgroundColor:
                selectedRisk === "HIGH" ? "red" : "white",
              color:
                selectedRisk === "HIGH" ? "white" : "#333",
            }}
          >
            🔴 HIGH RISK
          </button>
        </div>

        <p style={{ marginBottom: "0", color: "#555" }}>
          Showing <b>{filteredLocations.length}</b> location(s)
        </p>
      </div>

      {/* MAP */}

      <MapContainer
        center={[9.3, 76.8]}
        zoom={7}
        style={{
          height: "600px",
          width: "100%",
          borderRadius: "12px",
          overflow: "hidden",
        }}
      >
        <LayersControl position="topright">

          {/* STREET MAP */}

          <LayersControl.BaseLayer checked name="Street Map">
            <TileLayer
              attribution="&copy; OpenStreetMap contributors"
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
          </LayersControl.BaseLayer>

          {/* SATELLITE */}

          <LayersControl.BaseLayer name="Satellite View">
            <TileLayer
              attribution="&copy; Esri"
              url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
            />
          </LayersControl.BaseLayer>

        </LayersControl>

        {/* LOCATIONS */}

        {filteredLocations.map((location, index) => (
          <Fragment key={index}>

            {/* RISK AREA */}

            <Circle
              center={location.position}
              radius={15000}
              pathOptions={{
                color: getColor(location.risk),
                fillColor: getColor(location.risk),
                fillOpacity: 0.12,
                weight: 2,
              }}
            />

            {/* MARKER */}

            <CircleMarker
              center={location.position}
              radius={10}
              pathOptions={{
                color: getColor(location.risk),
                fillColor: getColor(location.risk),
                fillOpacity: 0.85,
                weight: 2,
              }}

              /*
                IMPORTANT:
                Clicking the marker directly now opens
                the environmental information panel.
              */
              eventHandlers={{
                click: () => {
                  setSelectedLocation(location);
                },
              }}
            >
              <Popup>
                <div
                  style={{
                    minWidth: "230px",
                    textAlign: "center",
                  }}
                >
                  <h3
                    style={{
                      marginTop: "0",
                      color: "#064663",
                    }}
                  >
                    {getRiskEmoji(location.risk)}{" "}
                    {location.name}
                  </h3>

                  <p>
                    <b>Risk Level:</b>{" "}
                    {location.risk}
                  </p>

                  <p>
                    <b>Risk Score:</b>{" "}
                    {location.riskScore}/100
                  </p>

                  <p>
                    <b>Temperature:</b>{" "}
                    {location.temperature}°C
                  </p>

                  <p>
                    <b>Pollution Reports:</b>{" "}
                    {location.pollution}
                  </p>

                  <p>
                    <b>Reason:</b>{" "}
                    {location.reason}
                  </p>

                  {/* FIXED BUTTON */}

                  <button
                    type="button"
                    onClick={() => {
                      setSelectedLocation(location);
                    }}
                    style={{
                      width: "100%",
                      padding: "10px",
                      backgroundColor: "#064663",
                      color: "white",
                      border: "none",
                      borderRadius: "6px",
                      cursor: "pointer",
                      fontWeight: "bold",
                    }}
                  >
                    View Environmental Details
                  </button>
                </div>
              </Popup>
            </CircleMarker>

          </Fragment>
        ))}
      </MapContainer>

      {/* ENVIRONMENTAL DETAILS */}

      {selectedLocation && (
        <div
          style={{
            backgroundColor: "white",
            marginTop: "20px",
            padding: "20px",
            borderRadius: "12px",
            boxShadow: "0 2px 10px rgba(0,0,0,0.15)",
          }}
        >
          {/* TITLE */}

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <h2
              style={{
                marginTop: "0",
                color: "#064663",
              }}
            >
              {getRiskEmoji(selectedLocation.risk)}{" "}
              {selectedLocation.name}
            </h2>

            <button
              type="button"
              onClick={() => setSelectedLocation(null)}
              style={{
                border: "none",
                backgroundColor: "#eee",
                borderRadius: "6px",
                padding: "7px 12px",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              ✕ Close
            </button>
          </div>

          {/* RISK STATUS */}

          <div
            style={{
              padding: "15px",
              borderRadius: "10px",
              marginBottom: "20px",
              backgroundColor:
                selectedLocation.risk === "HIGH"
                  ? "#ffe5e5"
                  : selectedLocation.risk === "CAUTION"
                  ? "#fff8d6"
                  : "#e5f7e5",
              borderLeft:
                `6px solid ${getColor(
                  selectedLocation.risk
                )}`,
            }}
          >
            <h3 style={{ marginTop: "0" }}>
              Environmental Risk Status
            </h3>

            <p>
              <b>Risk Level:</b>{" "}
              {selectedLocation.risk}
            </p>

            <p>
              <b>Risk Score:</b>{" "}
              {selectedLocation.riskScore}/100
            </p>

            <p>
              <b>Reason:</b>{" "}
              {selectedLocation.reason}
            </p>
          </div>

          {/* ENVIRONMENTAL DATA */}

          <h3 style={{ color: "#064663" }}>
            🌡️ Environmental Data
          </h3>

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(180px, 1fr))",
              gap: "15px",
            }}
          >
            {/* TEMPERATURE */}

            <div
              style={{
                padding: "15px",
                backgroundColor: "#f4f8fb",
                borderRadius: "8px",
              }}
            >
              <b>🌡️ Temperature</b>

              <br />

              <span
                style={{
                  fontSize: "22px",
                  fontWeight: "bold",
                }}
              >
                {selectedLocation.temperature}°C
              </span>
            </div>

            {/* POLLUTION */}

            <div
              style={{
                padding: "15px",
                backgroundColor: "#f4f8fb",
                borderRadius: "8px",
              }}
            >
              <b>🗑️ Pollution Reports</b>

              <br />

              <span
                style={{
                  fontSize: "22px",
                  fontWeight: "bold",
                }}
              >
                {selectedLocation.pollution}
              </span>
            </div>

            {/* REEF AREA */}

            <div
              style={{
                padding: "15px",
                backgroundColor: "#f4f8fb",
                borderRadius: "8px",
              }}
            >
              <b>🪸 Reef Area</b>

              <br />

              <span
                style={{
                  fontSize: "22px",
                  fontWeight: "bold",
                }}
              >
                {selectedLocation.reefArea}
              </span>
            </div>

            {/* LAST UPDATED */}

            <div
              style={{
                padding: "15px",
                backgroundColor: "#f4f8fb",
                borderRadius: "8px",
              }}
            >
              <b>📅 Last Updated</b>

              <br />

              <span
                style={{
                  fontSize: "22px",
                  fontWeight: "bold",
                }}
              >
                {selectedLocation.lastUpdated}
              </span>
            </div>
          </div>

          {/* ANOMALY */}

          <div
            style={{
              marginTop: "20px",
              padding: "15px",
              backgroundColor: "#f4f8fb",
              borderRadius: "8px",
            }}
          >
            <h3
              style={{
                marginTop: "0",
                color: "#064663",
              }}
            >
              🔎 Detected Environmental Anomaly
            </h3>

            <p>
              {selectedLocation.anomaly}
            </p>
          </div>
        </div>
      )}

      {/* LEGEND */}

      <div
        style={{
          backgroundColor: "white",
          marginTop: "20px",
          padding: "15px 20px",
          borderRadius: "10px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
        }}
      >
        <h2
          style={{
            marginTop: "0",
            color: "#064663",
          }}
        >
          Risk Legend
        </h2>

        <p>
          🟢 <b>SAFE</b> — Low environmental risk
        </p>

        <p>
          🟡 <b>CAUTION</b> — Moderate environmental risk
        </p>

        <p>
          🔴 <b>HIGH RISK</b> — Immediate attention required
        </p>
      </div>
    </div>
  );
}

export default App;