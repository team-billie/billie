import pytest
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_match_endpoint(monkeypatch):
    # 간단한 mocking: embed_image_bytes → zero tensor
    import torch
    from app.clip_embed import embed_image_bytes
    monkeypatch.setattr('app.clip_embed.embed_image_bytes', lambda b: torch.ones(1,512))

    data = {
        "before": ["https://example.com/b1.jpg", "https://example.com/b2.jpg"],
        "after":  ["https://example.com/a1.jpg"],
        "threshold": 0.0
    }
    resp = client.post("/match/", json=data)
    assert resp.status_code == 200
    body = resp.json()
    assert body["before_count"] == 2
    assert body["after_count"]  == 1
    assert isinstance(body["matches"], list)