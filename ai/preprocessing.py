import pandas as pd

# Kavi's confirmed data fields
COLUMNS = [
    "time",
    "latitude",
    "longitude",
    "CRW_DHW",
    "CRW_HOTSPOT",
    "CRW_SST",
    "CRW_SSTANOMALY",
    "extra_1",
    "extra_2",
    "extra_3",
    "extra_4"
]

# AI will use these environmental features
FEATURES = [
    "CRW_DHW",
    "CRW_HOTSPOT",
    "CRW_SST",
    "CRW_SSTANOMALY"
]


def load_data(file_path):

    # Read Kavi's CSV without assuming a header
    data = pd.read_csv(
        file_path,
        header=None,
        names=COLUMNS
    )

    # Convert environmental values to numbers
    for column in FEATURES:
        data[column] = pd.to_numeric(
            data[column],
            errors="coerce"
        )

    # Convert location values
    data["latitude"] = pd.to_numeric(
        data["latitude"],
        errors="coerce"
    )

    data["longitude"] = pd.to_numeric(
        data["longitude"],
        errors="coerce"
    )

    # Convert time
    data["time"] = pd.to_datetime(
        data["time"],
        errors="coerce"
    )

    # Remove invalid rows
    data = data.dropna(
        subset=[
            "time",
            "latitude",
            "longitude",
            "CRW_DHW",
            "CRW_HOTSPOT",
            "CRW_SST",
            "CRW_SSTANOMALY"
        ]
    )

    return data.reset_index(drop=True)


def prepare_features(file_path):

    data = load_data(file_path)

    X = data[FEATURES]

    return X, datapy