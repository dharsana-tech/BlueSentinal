import pandas as pd

# Input: cleaned environmental data
input_file = "satellite_data/processed/environmental_data.csv"

# Output: AI-ready environmental features
output_file = "satellite_data/processed/environmental_features.csv"

# Read processed data
df = pd.read_csv(input_file)

# Convert time to datetime
df["time"] = pd.to_datetime(df["time"])

# Sort by date
df = df.sort_values("time")

# Previous day's sea surface temperature
df["previous_sst"] = df["CRW_SST"].shift(1)

# Change in sea surface temperature
df["sst_change"] = df["CRW_SST"] - df["previous_sst"]

# Absolute temperature anomaly
df["anomaly_magnitude"] = df["CRW_SSTANOMALY"].abs()

# Positive heat stress only
df["positive_hotspot"] = df["CRW_HOTSPOT"].clip(lower=0)

# Fill missing value for the first record
df["previous_sst"] = df["previous_sst"].fillna(df["CRW_SST"])
df["sst_change"] = df["sst_change"].fillna(0)

# Save the extracted features
df.to_csv(output_file, index=False)

print("Feature extraction completed.")
print(f"Records: {len(df)}")
print(f"Output file: {output_file}")

print("\nExtracted features:")
print(df[
    [
        "time",
        "latitude",
        "longitude",
        "CRW_SST",
        "CRW_SSTANOMALY",
        "CRW_HOTSPOT",
        "CRW_DHW",
        "previous_sst",
        "sst_change",
        "anomaly_magnitude",
        "positive_hotspot"
    ]
].head())