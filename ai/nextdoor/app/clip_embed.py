import torch
from transformers import CLIPProcessor, CLIPModel
from PIL import Image
import io

# Load CLIP model & processor (singleton)
processor = CLIPProcessor.from_pretrained(
    "openai/clip-vit-base-patch32",
   use_fast=False
)
model = CLIPModel.from_pretrained("openai/clip-vit-base-patch32")


def embed_image(image_bytes: bytes) -> torch.Tensor:
    """
    Return L2-normalized image embedding (shape: [1, D]).
    """
    # Load bytes into PIL image
    image = Image.open(io.BytesIO(image_bytes)).convert("RGB")
    # Create input tensors for CLIP
    inputs = processor(images=image, return_tensors="pt")
    with torch.no_grad():
        feats = model.get_image_features(**inputs)
    # L2 normalization
    return feats / feats.norm(p=2, dim=-1, keepdim=True)