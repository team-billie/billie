# app/main.py
from fastapi import FastAPI
from app.routers.match import router as match_router

app = FastAPI(title="Nextdoor Match Service")
app.include_router(match_router)

@app.get("/health")
async def health():
    return {"status": "ok"}
