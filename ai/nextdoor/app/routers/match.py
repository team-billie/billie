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

@router.post("/", response_class=PlainTextResponse)
async def match_images(
    before: List[UploadFile] = File(...),
    after:  List[UploadFile] = File(...)
) -> str:
    # 1) Prepare names and embeddings
    before_names = [f.filename for f in before]
    after_names  = [f.filename for f in after]
    before_embs  = [embed_image(await f.read()) for f in before]
    after_embs   = [embed_image(await f.read()) for f in after]

    # 2) Compute similarity matrix and optimal matching
    sim_matrix = compute_similarity_matrix(before_embs, after_embs)
    idx_pairs  = match_embeddings(before_embs, after_embs)

    # 3) Summary info
    lines = []
    lines.append(f"테스트 이미지 수 : before={len(before_names)}, after={len(after_names)}")
    lines.append(f"매칭된 이미지 쌍 : {len(idx_pairs)}개")
    lines.append("")  # blank line

    # 4) Detail per match
    for idx, (i, j) in enumerate(idx_pairs, start=1):
        sim = sim_matrix[i, j]
        lines.append(f"매칭 #{idx} :")
        lines.append(f"  Before 이미지 : {before_names[i]}")
        lines.append(f"  After 이미지  : {after_names[j]}")
        lines.append(f"  유사도: {sim:.4f}")
        lines.append("")  # blank line between entries

    # 5) Return as plain text
    return "\n".join(lines)
