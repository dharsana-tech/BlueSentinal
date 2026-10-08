from preprocessing import load_data
from feature_engineering import (
    calculate_risk_score,
    classify_risk
)


DATA_PATH = "data/reef_data.csv"


data = load_data(DATA_PATH)

results = []


for _, row in data.iterrows():

    dhw = float(row["CRW_DHW"])
    hotspot = float(row["CRW_HOTSPOT"])
    sst = float(row["CRW_SST"])
    sst_anomaly = float(row["CRW_SSTANOMALY"])

    score = calculate_risk_score(
        dhw,
        hotspot,
        sst,
        sst_anomaly
    )

    level = classify_risk(score)

    results.append({
        "time": row["time"],
        "latitude": row["latitude"],
        "longitude": row["longitude"],
        "dhw": dhw,
        "hotspot": hotspot,
        "sst": sst,
        "sst_anomaly": sst_anomaly,
        "risk_score": score,
        "risk_level": level
    })


print("=" * 60)
print("BLUE SENTINEL - DATASET ANALYSIS")
print("=" * 60)

print("\nTotal observations:", len(results))

highest_risk = max(
    results,
    key=lambda x: x["risk_score"]
)

highest_sst = max(
    results,
    key=lambda x: x["sst"]
)

highest_anomaly = max(
    results,
    key=lambda x: x["sst_anomaly"]
)


print("\nHighest Risk")
print("-" * 30)
print("Date:", highest_risk["time"])
print("Risk Score:", highest_risk["risk_score"])
print("Risk Level:", highest_risk["risk_level"])


print("\nHighest Sea Surface Temperature")
print("-" * 30)
print("Date:", highest_sst["time"])
print("SST:", highest_sst["sst"])


print("\nHighest Temperature Anomaly")
print("-" * 30)
print("Date:", highest_anomaly["time"])
print("SST Anomaly:", highest_anomaly["sst_anomaly"])


print("\nLatest Observation")
print("-" * 30)

latest = results[-1]

print("Date:", latest["time"])
print("SST:", latest["sst"])
print("SST Anomaly:", latest["sst_anomaly"])
print("DHW:", latest["dhw"])
print("Hotspot:", latest["hotspot"])
print("Risk Score:", latest["risk_score"])
print("Risk Level:", latest["risk_level"])