import os
import argparse
import numpy as np
import torch
import torch.nn as nn
import torch.nn.functional as F
import torch.optim as optim
from torch.optim import lr_scheduler
from data_loader import get_loader
from models import VqaModel
from torchvision import transforms
from data_loader import VqaDataset

device = torch.device('cuda')

def infer(model, fstream, question_tokens):
    
    transform = {'train': transforms.Compose([transforms.ToTensor(),
                                        transforms.Normalize((0.485, 0.456, 0.406),
                                                             (0.229, 0.224, 0.225))])} 

    dataset = VqaDataset.from_fstream('./demo', fstream, question_tokens, transform=True)
    
    qst_vocab_size = dataset.qst_vocab.vocab_size
    ans_vocab_size = dataset.ans_vocab.vocab_size
    ans_unk_idx = dataset.ans_vocab.unk2idx
    
    batch_sample = next(iter(dataset))
    image = batch_sample['image'].unsqueeze(0).to(device)
    
    question = torch.from_numpy(batch_sample['question']).unsqueeze(0).to(device)
    
    idx2ans = [line.strip() for line in open('./demo/vocab_answers.txt','r').readlines()]
    
    output = model(image, question)
    probs, indices = torch.sort(F.softmax(output.squeeze(), dim=0), dim=0, descending=True)
    probs_top5 = probs.tolist()[:5]
    
    answers_top5 = list()
    for idx in indices.tolist()[:5]:
        if idx != 0:
            ans = idx2ans[idx]
        else:
            ans = 'not sure'
        answers_top5.append(ans)
    
    return probs_top5, answers_top5