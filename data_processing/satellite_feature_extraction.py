from PIL import Image
import pandas as pd
import os

# Satellite image
image_file = "satellite_data/satellite/images/2026-09-28-00_00_2026-09-28-23_59_Sentinel-2_L2A_True_color.jpg"

# Output file
output_file = "satellite_data/processed/satellite_features.csv"

# Open image
image = Image.open(image_file).convert("RGB")

# Get image dimensions
width, height = image.size

# Get pixel values
pixels = list(image.getdata())

# Create dataframe
df = pd.DataFrame(pixels, columns=["red", "green", "blue"])

# Extract basic image features
features = {
    "image_width": width,
    "image_height": height,
    "mean_red": df["red"].mean(),
    "mean_green": df["green"].mean(),
    "mean_blue": df["blue"].mean(),
    "mean_brightness": df[["red", "green", "blue"]].mean().mean()
}

# Create processed directory
os.makedirs("satellite_data/processed", exist_ok=True)

# Save features
feature_df = pd.DataFrame([features])
feature_df.to_csv(output_file, index=False)

print("Satellite feature extraction completed.")
print(f"Image size: {width} x {height}")
print(f"Output file: {output_file}")

print("\nExtracted features:")
print(feature_df)