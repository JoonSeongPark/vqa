import uuid
import os
import random
import json

import numpy as np
from PIL import Image
import requests
from flask import Flask, request, jsonify, send_file
import torch

from models import VqaModel
from data_loader import VqaDataset
from infer import infer
from utils import text_helper

device = torch.device('cuda')

input_dir = './demo'
qst_vocab_size = text_helper.VocabDict(input_dir+'/vocab_questions.txt').vocab_size
ans_vocab_size = text_helper.VocabDict(input_dir+'/vocab_answers.txt').vocab_size

model = VqaModel(
    embed_size=1024,
    qst_vocab_size=qst_vocab_size,
    ans_vocab_size=ans_vocab_size,
    word_embed_size=300,
    num_layers=2,
    hidden_size=512).to(device)

checkpoint = torch.load('/home/rytt00/vqa/vqa_api/models/model-epoch-05.ckpt', map_location='cuda:0')
model.load_state_dict(checkpoint['state_dict'])
model.eval()

app = Flask(__name__)

fdir = "/home/rytt00/vqa/vqa_api/datasets/Images/test2015/"
fnames = os.listdir(fdir)

@app.route("/get_images", methods=["GET"])
def get_images():
    samples = random.sample(fnames, k=4)
    ret = [
        {"imageId": "{}".format(int(sample[16:-4])), "imageUrl": sample} for sample in samples
    ]

    return jsonify(ret)


@app.route("/get_image", methods=["GET"])
def get_image():
    fname = request.args.get("image_url")
    fpath = os.path.join(fdir, fname)
    fext = fname.split(".")[-1]

    return send_file(fpath, mimetype="image/jpg")


@app.route("/upload", methods=["POST"])
def upload():
    fstream = request.files["photo"].stream
    question = request.form.get("question")
    question_tokens = question.split(' ')
    probs, answers = infer(model, fstream, question_tokens)

    ret = [
        {"answer": answer, "prob": prob * 100} for prob, answer in zip(probs, answers)
    ]

    return jsonify(ret)
