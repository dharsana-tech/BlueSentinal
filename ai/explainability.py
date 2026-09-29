def get_risk_factors(
    water_temperature,
    temperature_anomaly,
    turbidity,
    chlorophyll,
    pollution_reports
):
    factors = []

    if water_temperature >= 29:
        factors.append("Elevated water temperature")

    if temperature_anomaly >= 1.5:
        factors.append("High temperature anomaly")

    if turbidity >= 8:
        factors.append("High water turbidity")

    if chlorophyll >= 2.5:
        factors.append("Elevated chlorophyll concentration")

    if pollution_reports >= 5:
        factors.append("Increase in pollution reports")

    if not factors:
        factors.append(
            "No major environmental stress indicator detected"
        )

    return factors


def get_recommended_action(risk_level):
    if risk_level == "HIGH":
        return "Field verification and immediate environmental assessment recommended"

    elif risk_level == "MEDIUM":
        return "Increase monitoring and schedule field verification"

    else:
        return "Continue routine environmental monitoring"