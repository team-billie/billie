# 사진 매칭(Assignment) 
# before/after 각각 업로드된 파일 리스트를 읽어서
# CLIP 임베딩 → Hungarian 매칭
# app/routers/match.py
from fastapi import APIRouter, HTTPException
from fastapi.responses import JSONResponse
from pydantic import BaseModel, HttpUrl
from typing import List
import httpx
from app.clip_embed import embed_image_bytes
from app.matcher import match_embeddings, compute_similarity_matrix

router = APIRouter(prefix="/match", tags=["match"])

class MatchRequest(BaseModel):
    before: List[HttpUrl]
    after:  List[HttpUrl]
    threshold: float = 0.5  # optional threshold

@router.post("/", response_class=JSONResponse)
async def match_images(req: MatchRequest):
    # 1) Download images from S3 URLs
    async with httpx.AsyncClient() as client:
        tasks_before = [client.get(url) for url in req.before]
        tasks_after  = [client.get(url) for url in req.after]
        resp_b = await httpx.gather(*tasks_before)
        resp_a = await httpx.gather(*tasks_after)

    before_embs = []
    for r in resp_b:
        if r.status_code != 200:
            raise HTTPException(status_code=400, detail=f"before images Failed to fetch {r.url}")
        before_embs.append(embed_image_bytes(r.content))

    after_embs = []
    for r in resp_a:
        if r.status_code != 200:
            raise HTTPException(status_code=400, detail=f"after images Failed to fetch {r.url}")
        after_embs.append(embed_image_bytes(r.content))


    # 2) Match embeddings
    idx_pairs = match_embeddings(before_embs, after_embs, req.threshold)
    sim_matrix = compute_similarity_matrix(before_embs, after_embs)

    # 3) Format response
    results = []
    for i, j, sim in idx_pairs:
        results.append({
            "before_index": i,
            "after_index": j,
            "similarity": round(sim, 4)
        })

    return {  
        "before_count": len(req.before),
        "after_count":  len(req.after),
        "matches":     results
    }
