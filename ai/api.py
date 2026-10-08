from fastapi import FastAPI
from preprocessing import load_data
from feature_engineering import (
    calculate_risk_score,
    classify_risk,
    get_risk_factors
)

app = FastAPI(
    title="Blue Sentinel AI",
    description="Environmental risk detection service",
    version="1.0"
)

DATA_PATH = "data/reef_data.csv"


@app.get("/")
def home():
    return {
        "service": "Blue Sentinel AI",
        "status": "running"
    }


@app.get("/health")
def health():
    return {
        "status": "healthy"
    }


@app.get("/api/risk")
def get_latest_risk():

    # Load Kavi's environmental data
    data = load_data(DATA_PATH)

    # Get latest observation
    latest = data.iloc[-1]

    dhw = float(latest["CRW_DHW"])
    hotspot = float(latest["CRW_HOTSPOT"])
    sst = float(latest["CRW_SST"])
    sst_anomaly = float(latest["CRW_SSTANOMALY"])

    latitude = float(latest["latitude"])
    longitude = float(latest["longitude"])

    # Calculate risk
    risk_score = calculate_risk_score(
        dhw,
        hotspot,
        sst,
        sst_anomaly
    )

    risk_level = classify_risk(risk_score)

    factors = get_risk_factors(
        dhw,
        hotspot,
        sst,
        sst_anomaly
    )

    # Recommended action
    if risk_level == "HIGH":
        action = "Immediate field verification recommended"

    elif risk_level == "MEDIUM":
        action = "Increase monitoring and schedule field verification"

    else:
        action = "Continue routine environmental monitoring"

    return {
        "location": {
            "latitude": latitude,
            "longitude": longitude
        },
        "observation_time": str(latest["time"]),

        "environmental_data": {
            "dhw": dhw,
            "hotspot": hotspot,
            "sst": sst,
            "sst_anomaly": sst_anomaly
        },

        "risk": {
            "score": risk_score,
            "level": risk_level
        },

        "risk_factors": factors,

        "recommended_action": action
    }