const API_BASE = "http://127.0.0.1:5000/api";

export async function getAuthorityReports() {
  const response = await fetch(`${API_BASE}/reports`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Failed to fetch authority reports");
  }

  return data;
}

export async function updateReportStatus(reportId, status) {
  const allowedStatuses = [
    "reported",
    "verified",
    "rejected",
    "action_started",
    "resolved"
  ];

  if (!allowedStatuses.includes(status)) {
    throw new Error("Invalid report status");
  }

  const response = await fetch(
    `${API_BASE}/reports/${reportId}/status`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ status })
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Failed to update report status");
  }

  return data;
}

export async function verifyReport(reportId) {
  return updateReportStatus(reportId, "verified");
}

export async function rejectReport(reportId) {
  return updateReportStatus(reportId, "rejected");
}

export async function startAction(reportId) {
  return updateReportStatus(reportId, "action_started");
}

export async function resolveReport(reportId) {
  return updateReportStatus(reportId, "resolved");
}