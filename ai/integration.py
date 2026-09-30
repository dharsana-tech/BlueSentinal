import requests

AI_API_URL = "http://127.0.0.1:8001/predict"


def get_ai_prediction(data):
    response = requests.post(
        AI_API_URL,
        json=data
    )

    response.raise_for_status()

    return response.json()

if __name__ == "__main__":

    environmental_data = {
        "water_temperature": 29.2,
        "temperature_anomaly": 1.7,
        "turbidity": 10.2,
        "chlorophyll": 3.1,
        "pollution_reports": 6,
        "historical_risk": 65
    }

    result = get_ai_prediction(environmental_data)

    print(result)