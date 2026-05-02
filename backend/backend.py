from flask import Flask, jsonify, request
from flask_cors import CORS
import tensorflow as tf
import numpy as np
import keras
from keras.preprocessing import image
import os
from werkzeug.utils import secure_filename
import matplotlib
matplotlib.use('Agg')

app = Flask(__name__)
CORS(app)

interpreter = tf.lite.Interpreter(
  model_path="./ia_model/brain_tumor_cnn.tflite"
)
interpreter.allocate_tensors()
input_details = interpreter.get_input_details()
output_details = interpreter.get_output_details()


class_names = ['glioma', 'meningioma', 'notumor', 'pituitary']


UPLOAD_FOLDER = os.path.join('static', 'uploads')
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER


def predict_with_tflite(img_array):
  img_array = img_array.astype(np.float32) / 255.0
  interpreter.set_tensor(
    input_details[0]['index'], img_array)
  interpreter.invoke()
  output_data = interpreter.get_tensor(
    output_details[0]['index'])
  return output_data[0]


@app.route('/api/clasificar', methods=['POST'])
def clasificar_api():
  file = request.files.get('image')
  if not file:
    return jsonify({'error': 'No se envio imagen'}), 400
  filename = secure_filename(file.filename)
  filepath = os.path.join(
    app.config['UPLOAD_FOLDER'], filename)
  file.save(filepath)


  img = image.load_img(
    filepath, target_size=(128, 128))
  img_array = image.img_to_array(img)
  img_array = np.expand_dims(img_array, axis=0)


  prediction = predict_with_tflite(img_array)
  predicted_class = class_names[np.argmax(prediction)]
  probabilities = {
    class_names[i]: float(f'{prob:.4f}')
    for i, prob in enumerate(prediction)
  }

  return jsonify({
    'prediction': f'Prediccion: {predicted_class.upper()}',
    'image_name': filename,
    'probs': probabilities
  })

@app.route('/helloworld')
def hello_world():
  return jsonify({'message': 'Hello, World!'}), 200


if __name__ == '__main__':
  app.run(debug=True, host="0.0.0.0", port=5000)
