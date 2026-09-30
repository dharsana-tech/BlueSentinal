def calculate_risk_score(dhw, hotspot, sst, sst_anomaly):
    """
    Prototype coral reef environmental risk score.

    Uses only environmental variables available
    in Kavi's dataset.
    """

    # DHW contribution
    dhw_score = min(max((dhw / 8) * 40, 0), 40)

    # SST anomaly contribution
    anomaly_score = min(
        max((sst_anomaly / 2.5) * 40, 0),
        40
    )

    # Hotspot contribution
    hotspot_score = min(
        max((hotspot / 1.0) * 20, 0),
        20
    )

    risk_score = (
        dhw_score +
        anomaly_score +
        hotspot_score
    )

    return round(min(max(risk_score, 0), 100), 2)


def classify_risk(score):

    if score >= 70:
        return "HIGH"

    elif score >= 40:
        return "MEDIUM"

    else:
        return "LOW"


def get_risk_factors(dhw, hotspot, sst, sst_anomaly):

    factors = []

    if dhw > 0:
        factors.append(
            "Accumulated coral heat stress detected"
        )

    if hotspot > 0:
        factors.append(
            "Coral Reef Watch hotspot detected"
        )

    if sst_anomaly >= 1.5:
        factors.append(
            "High sea surface temperature anomaly"
        )

    elif sst_anomaly >= 1.0:
        factors.append(
            "Elevated sea surface temperature anomaly"
        )

    if sst >= 30:
        factors.append(
            "High sea surface temperature"
        )

    if not factors:
        factors.append(
            "No major thermal stress indicator detected"
        )

    return factors