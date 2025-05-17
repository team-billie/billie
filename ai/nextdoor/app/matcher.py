import torch
import numpy as np
from scipy.optimize import linear_sum_assignment

def compute_similarity_matrix(before_embs, after_embs):
    B = torch.cat(before_embs, dim=0)
    A = torch.cat(after_embs, dim=0)
    sim = B @ A.T
    return sim.cpu().numpy()

# 유사도 측정
def match_embeddings(before_embs, after_embs, threshold: float = 0.5):
    sim_matrix = compute_similarity_matrix(before_embs, after_embs)
    cost = 1 - sim_matrix
    row_idx, col_idx = linear_sum_assignment(cost)
    pairs = []
    for i, j in zip(row_idx, col_idx):
        if sim_matrix[i, j] >= threshold:
            pairs.append((int(i), int(j), float(sim_matrix[i, j])))
    return pairs
