from keras.applications.efficientnet import preprocess_input
from keras.models import load_model
from keras.preprocessing.image import img_to_array, load_img
import numpy as np
import sys

from keras.models import load_model
from efficientnet.tfkeras import EfficientNetB0
from utils import EXCLUDED_FOLDERS, NUM_CLASSES, ROOT_DIR, collect_image_paths, generate_training_labels, plot_confusion_matrix, populate_formatted_image_array

if __name__ == "__main__":
    path = sys.argv[1]
    model = load_model('cnn_model.keras')

    # Adjust the image loading and preprocessing to match training
    image = load_img(path, target_size=(32, 32))  # EfficientNetB0 typical input size
    image_array = img_to_array(image)
    image_array = preprocess_input(image_array)  # EfficientNet-specific preprocessing
    image_batch = np.expand_dims(image_array, axis=0)

    prob = model.predict(image_batch)
    confidence_score = np.max(prob)
    predicted_class = np.argmax(prob)
    print(f"Predicted class: {predicted_class}, Confidence score: {confidence_score:.2f}")