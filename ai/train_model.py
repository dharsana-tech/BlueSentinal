import os
import joblib

from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, classification_report

from preprocessing import prepare_data


DATA_PATH = "data/reef_data.csv"
MODEL_PATH = "models/risk_model.pkl"


# Load dataset
X, y = prepare_data(DATA_PATH)


# Split dataset
X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.25,
    random_state=42,
    stratify=y
)


# Create model
model = RandomForestClassifier(
    n_estimators=150,
    max_depth=6,
    random_state=42
)


# Train model
model.fit(X_train, y_train)


# Test model
predictions = model.predict(X_test)

accuracy = accuracy_score(y_test, predictions)


# Create models folder if required
os.makedirs("models", exist_ok=True)


# Save trained model
joblib.dump(model, MODEL_PATH)


print("=" * 40)
print("BLUE SENTINEL ML MODEL")
print("=" * 40)

print("Training completed successfully.")
print("Test Accuracy:", round(accuracy, 2))

print("\nClassification Report:")
print(classification_report(y_test, predictions))

print("Model saved to:", MODEL_PATH)