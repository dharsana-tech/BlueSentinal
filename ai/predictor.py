from preprocessing import load_data
from feature_engineering import (
    calculate_risk_score,
    classify_risk,
    get_risk_factors
)


def predict_latest_risk(file_path):

    # Load Kavi's environmental data
    data = load_data(file_path)

    # Get the latest observation
    latest = data.iloc[-1]

    # Read environmental values
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

    # Convert score to risk level
    risk_level = classify_risk(risk_score)

    # Find reasons for the risk
    risk_factors = get_risk_factors(
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
        "time": str(latest["time"]),
        "latitude": latitude,
        "longitude": longitude,
        "dhw": dhw,
        "hotspot": hotspot,
        "sst": sst,
        "sst_anomaly": sst_anomaly,
        "risk_score": risk_score,
        "risk_level": risk_level,
        "risk_factors": risk_factors,
        "recommended_action": action
    }


if __name__ == "__main__":

    result = predict_latest_risk(
        "data/reef_data.csv"
    )

    print("=" * 50)
    print("BLUE SENTINEL AI RISK ANALYSIS")
    print("=" * 50)

    print("\nLocation")
    print("Latitude:", result["latitude"])
    print("Longitude:", result["longitude"])

    print("\nEnvironmental Data")
    print("DHW:", result["dhw"])
    print("Hotspot:", result["hotspot"])
    print("SST:", result["sst"])
    print("SST Anomaly:", result["sst_anomaly"])

    print("\nAI Risk Result")
    print("Risk Score:", result["risk_score"])
    print("Risk Level:", result["risk_level"])

    print("\nRisk Factors")

    for factor in result["risk_factors"]:
        print("-", factor)

    print("\nRecommended Action")
    print(result["recommended_action"])