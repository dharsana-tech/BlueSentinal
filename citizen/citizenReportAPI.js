const API_BASE = "http://127.0.0.1:5000/api";

export async function submitCitizenReport({
  latitude,
  longitude,
  description,
  pollution_type = "unknown",
  image_url = null
}) {
  const response = await fetch(`${API_BASE}/reports`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      latitude: Number(latitude),
      longitude: Number(longitude),
      description,
      pollution_type,
      image_url
    })
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Failed to submit citizen report");
  }

  return data;
}

export async function getCitizenReports() {
  const response = await fetch(`${API_BASE}/reports`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Failed to fetch citizen reports");
  }

  return data;
}