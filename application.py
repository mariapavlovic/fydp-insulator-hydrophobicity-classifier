import math
from flask import Flask, request, redirect, url_for, send_from_directory, jsonify
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
import os
import boto3
import io
from sqlalchemy.exc import IntegrityError
import urllib
from flask_cors import CORS
import base64
import numpy as np
from flask import Flask, request, jsonify, make_response
from keras.models import load_model
from PIL import Image
import numpy as np
from efficientnet.tfkeras import EfficientNetB0
from flask_cors import CORS
import urllib.request

application = Flask(__name__)
CORS(application)

IMAGE_WIDTH = 32
IMAGE_HEIGHT = 32
model = load_model('cnn_model_v2.h5')

S3_BUCKET = 'vincent-testing'
S3_ACCESS_KEY = os.environ.get('S3_ACCESS_KEY')
S3_SECRET_KEY = os.environ.get('S3_SECRET_KEY')
S3_REGION = 'us-east-1'

s3 = boto3.client(
   's3',
   aws_access_key_id=S3_ACCESS_KEY,
   aws_secret_access_key=S3_SECRET_KEY,
   region_name=S3_REGION
)

@application.route('/upload', methods=['POST'])
def upload_file():
    if 'image' not in request.form:
        return jsonify({'error': 'No file part'}), 400
    
    data = request.form.get('image')
    file = urllib.request.urlopen(data)

    if 'data:' in data and ';base64,' in data:
        data = data.split(';base64,')[1]

    decoded = base64.b64decode(data)

    file_content = file.read()
    print("file size outside", len(file_content))

    try:
        if request.method == 'POST':
            image_id = hash(file_content)

            s3_uri = f"https://{S3_BUCKET}.s3.amazonaws.com/{str(image_id)}.jpeg"

            s3.upload_fileobj(
                io.BytesIO(decoded),
                S3_BUCKET,
                f"{str(image_id)}.jpeg",
                ExtraArgs={
                    "ACL": "public-read",
                    "ContentType": "image/jpeg"
                }
            )

            return jsonify({'message': 'Upload successful', 's3_uri': s3_uri}), 201
    except IntegrityError:
        return jsonify({'error': 'File already exists'}), 400
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@application.route('/uploads/<filename>')
def uploaded_file(filename):
    return send_from_directory('', filename)

@application.route('/')
def index():
    return 'Hello, World 0!'

@application.route('/classify', methods=['POST'])
def single_classification():
    if (request.form.get('image')): 
        file = urllib.request.urlopen(request.form.get('image'))
        image_id = request.form.get("image_ids")

        image = process_image([file])
        prediction = model.predict(image)
        conf = truncate(float(np.max(prediction, axis=1)[0])*100, 2)
        predicted_label = np.argmax(prediction, axis=1)[0]
        response = {
            "id": image_id,
            "s3Path": "eventually we do this too",
            "classification": int(predicted_label),
            "confidence": conf
        }
        print(response)
        return jsonify(response)
    return jsonify({})

def process_image(selected_images: list):
    image_array = []
    total = len(selected_images)
    count = 0
    for image_blob in selected_images:
        print("populating image array: ", count, "of ", total)
        image = Image.open(image_blob)
        image = image.resize((IMAGE_WIDTH, IMAGE_HEIGHT))
        image = image.convert('RGB')
        image = np.array(image) / 255.0
        image_array.append(image)
        count += 1
    image_array = np.array(image_array)
    return image_array

def truncate(f, n):
    return math.floor(f * 10 ** n) / 10 ** n

if __name__ == '__main__':
    application.run(debug=True)
