import uuid
import os
import random
import json

import numpy as np
from PIL import Image
import requests
from flask import Flask, request, jsonify, send_file

from infer import infer

app = Flask(__name__)
app.config["UPLOAD_FOLDER"] = "./upload"

fdir = '/home/rytt00/vqa/datasets/Images/test2015/'
fnames = os.listdir(fdir)

@app.route("/get_images", methods=["GET"])
def get_images():
    samples = random.choices(fnames, k=4)
    ret = [{'imageId':f'{int(sample[14:-4])}', 'imageUrl':sample} for sample in samples]
    
    return jsonify(ret)

@app.route("/get_image", methods=["GET"])
def get_image():
    fname = request.args.get('image_url')
    fpath = os.path.join(fdir, fname)
    fext = fname.split('.')[-1]

    return send_file(fpath, mimetype='image/jpg')

def save_vqa(question):
    vqa = \
    [{'image_name': 'COCO_train2014_000000458752',
      'image_path': '/home/rytt00/vqa/upload/last.jpg',
      'question_id': 458752000,
      'question_str': question,
      'question_tokens': question.split(' '),
      'all_answers': ['net','net','net','netting','net','net','mesh','net','net','net'],
      'valid_answers': ['net', 'net', 'net', 'net', 'net', 'net', 'net', 'net']}]
    
    np.save('/home/rytt00/vqa/demo/demo.npy', vqa)

@app.route("/upload", methods=["POST"])
def upload():
    file = request.files["photo"]
    quest = request.form.get('question')
    fext = os.path.splitext(file.filename)[1]
    fname = 'last' + fext
    file.save(os.path.join(app.config["UPLOAD_FOLDER"], fname))
    
    save_path = os.path.join(app.config["UPLOAD_FOLDER"], fname)
    Image.open(save_path).resize((448,448)).save(save_path)
    
    save_vqa(quest)
    
    probs, answers = infer('model-epoch-05.ckpt')
    
    ret = [{'answer':answer, 'prob':prob*100} 
           for prob, answer in zip(probs, answers)]
    
    return jsonify(ret)