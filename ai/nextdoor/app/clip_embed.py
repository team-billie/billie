import torch
from transformers import CLIPProcessor, CLIPModel
from PIL import Image
import io

# Load CLIP model & processor
processor = CLIPProcessor.from_pretrained("openai/clip-vit-base-patch32", use_fast=False)
model = CLIPModel.from_pretrained("openai/clip-vit-base-patch32")


def embed_image_bytes(image_bytes: bytes) -> torch.Tensor:
    """
    Return L2-normalized image embedding from raw bytes.
    """
    img = Image.open(io.BytesIO(image_bytes)).convert("RGB")
    inputs = processor(images=img, return_tensors="pt")
    with torch.no_grad():
        feats = model.get_image_features(**inputs)
    return feats / feats.norm(p=2, dim=-1, keepdim=True)