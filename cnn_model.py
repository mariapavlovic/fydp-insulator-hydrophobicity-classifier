from preprocessing import preprocess_images
import os
import random
from efficientnet.keras import EfficientNetB0
from keras.models import Sequential
from keras.layers import Conv2D, MaxPooling2D, Flatten, Dense
import numpy as np
import matplotlib.pyplot as plt
from keras.datasets import mnist
from keras.utils import to_categorical
from imgaug import augmenters as iaa
from PIL import Image
from sklearn.metrics import confusion_matrix
from utils import collect_image_paths, plot_confusion_matrix, populate_formatted_image_array, generate_training_labels
from utils import IMAGE_HEIGHT, IMAGE_WIDTH

root_dir = 'dataset'
excluded_folder = "original_only"

# collecting data on training/testing images used, populating arrays for paths of selected training/testing images
num_images_used_train, \
num_images_used_test, \
selected_image_paths_train, \
selected_image_paths_test = collect_image_paths(
    root_dir, excluded_folder
)

print(f"Total training images used: {num_images_used_train}")
print(f"Total testing images used: {num_images_used_test}")

train_images = populate_formatted_image_array(selected_image_paths_train)
test_images = populate_formatted_image_array(selected_image_paths_test)

image_height = IMAGE_HEIGHT
image_width = IMAGE_WIDTH
num_channels = 3
num_classes = 7
num_epochs = 10
batch_size = 32

train_labels = generate_training_labels(selected_image_paths_train)
test_labels = generate_training_labels(selected_image_paths_test)

base_model = EfficientNetB0(weights='imagenet', include_top=False, input_shape=(image_height, image_width, num_channels))
model = Sequential()
model.add(base_model)
model.add(Flatten())
model.add(Dense(units=128, activation='relu'))
model.add(Dense(units=num_classes, activation='softmax'))
model.compile(optimizer='adam', loss='sparse_categorical_crossentropy', metrics=['accuracy'])
model.fit(train_images, train_labels, epochs=num_epochs, batch_size=batch_size)

# Evaluation
test_loss, test_accuracy = model.evaluate(test_images, test_labels)
print('Test Loss:', test_loss)
print('Test Accuracy:', test_accuracy)

# Predictions
predictions = model.predict(test_images)
predicted_labels = np.argmax(predictions, axis=1)

# Plot confusion matrix
plot_confusion_matrix(test_labels, predicted_labels, num_classes)