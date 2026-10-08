# Blue Sentinel AI Data Specification

## Purpose

The AI/ML module analyzes environmental and citizen-reported data to identify areas with increased coral reef stress risk.

## Input Features

| Feature | Unit | Source |
|---|---|---|
| Water Temperature | °C | Satellite / Environmental Data |
| Temperature Anomaly | °C | Historical + Current Data |
| Turbidity | NTU | Satellite / Environmental Data |
| Chlorophyll-a | mg/m³ | Satellite Data |
| Pollution Reports | Count | Citizen Reports |
| Historical Risk | 0–100 | Previous Risk Records |

## AI Outputs

- Risk Score: 0–100
- Risk Level: LOW / MEDIUM / HIGH
- Confidence Score
- Main Risk Factors
- Recommended Action

## AI Pipeline

Satellite & Environmental Data
        ↓
Data Preprocessing
        ↓
Feature Engineering
        ↓
ML Risk Detection Model
        ↓
Risk Score
        ↓
Risk Level + Risk Factors
        ↓
Backend API
        ↓
GIS Dashboard + Alerts