import pandas as pd
import os

# Input file
input_file = "satellite_data/environmental/raw/dhw_5km_95d4_0017_1106.csv"

# Output file
output_file = "satellite_data/processed/environmental_data.csv"

# Read NOAA data
df = pd.read_csv(input_file, skiprows=[1])

# Remove unnecessary spaces from column names
df.columns = df.columns.str.strip()

# Convert time column to datetime
df["time"] = pd.to_datetime(df["time"], errors="coerce")

# Convert numerical columns to numbers
numeric_columns = [
    "latitude",
    "longitude",
    "CRW_DHW",
    "CRW_HOTSPOT",
    "CRW_SST",
    "CRW_SSTANOMALY"
]

for column in numeric_columns:
    df[column] = pd.to_numeric(df[column], errors="coerce")

# Remove rows with missing values
df = df.dropna()

# Create output directory if it doesn't exist
os.makedirs("satellite_data/processed", exist_ok=True)

# Save cleaned data
df.to_csv(output_file, index=False)

print("Environmental data preprocessing completed.")
print(f"Processed records: {len(df)}")
print(f"Output file: {output_file}")
print("\nFirst 5 records:")
print(df.head())