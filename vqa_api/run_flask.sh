#!bin/bash

export FLASK_APP=vqa_api.py
export FLASK_ENV=development

flask run --host=0.0.0.0
