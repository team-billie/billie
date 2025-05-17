from fastapi import FastAPI
from app.routers.match import router as match_router

app = FastAPI()
app.include_router(match_router)

@app.get("/health")
async def health():
    return {"status": "ok"}
