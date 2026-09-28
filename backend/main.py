from fastapi import FastAPI

app = FastAPI(title="Blue Sentinel API")


@app.get("/")
def home():
    return {
        "message": "Blue Sentinel Backend is running"
    }


@app.get("/api/health")
def health_check():
    return {
        "status": "healthy"
    }