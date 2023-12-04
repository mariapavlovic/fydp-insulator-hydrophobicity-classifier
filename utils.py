import os
import matplotlib.pyplot as plt
import numpy as np
from PIL import Image
from sklearn.metrics import confusion_matrix

# constants: current dimensions
IMAGE_WIDTH = 32
IMAGE_HEIGHT = 32

# reusable functions
selected_image_paths_train = []
selected_image_paths_test = []
def collect_image_paths(directory, excluded_folder):
    print("collecting paths")
    if "5+" in directory:
        return 0, 0, [], []
    num_images_used_train = 0
    num_images_used_test = 0
    for item in os.listdir(directory):
        item_path = os.path.join(directory, item)
        if os.path.isdir(item_path):
            if os.path.basename(item_path).lower() != excluded_folder.lower():
                used_train, used_test, _, _ = collect_image_paths(item_path, excluded_folder)
                num_images_used_train += used_train
                num_images_used_test += used_test
            else:
                _, used_test, _, _ = collect_image_paths(item_path, excluded_folder)
                num_images_used_test += used_test
        else:
            if item_path.lower().endswith(('.jpg', '.jpeg', '.png')):
                if excluded_folder not in os.path.dirname(item_path):
                    selected_image_paths_train.append(item_path)
                    num_images_used_train += 1
                else:
                    selected_image_paths_test.append(item_path)
                    num_images_used_test += 1
    return num_images_used_train, num_images_used_test, selected_image_paths_train, selected_image_paths_test

def populate_formatted_image_array(selected_image_paths: list):
    image_array = []
    total = len(selected_image_paths)
    count = 0
    for image_path in selected_image_paths:
        print("populating image array: ", count, "of ", total)
        image = Image.open(image_path)
        image = image.resize((IMAGE_WIDTH, IMAGE_HEIGHT))
        image = image.convert('RGB')
        image = np.array(image) / 255.0
        image_array.append(image)
        count += 1
    image_array = np.array(image_array)
    return image_array

def generate_training_labels(selected_image_paths: list):
    training_labels = []
    total = len(selected_image_paths)
    count = 0
    for path in selected_image_paths:
        print("generating labels: ", count, "of ", total)
        subdir = path.split("/")
        training_labels.append(int(subdir[2]))
        count += 1
    training_labels = np.array(training_labels)
    return training_labels

def plot_confusion_matrix(test_labels: list, predicted_labels: list, num_classes: int):
    num_classes -= 1    # not using directory 5+
    cm = confusion_matrix(test_labels, predicted_labels)
    plt.figure(figsize=(8, 8))
    plt.imshow(cm, interpolation='nearest', cmap='Blues')
    plt.title('Confusion Matrix')
    plt.colorbar()
    tick_marks = np.arange(num_classes)
    plt.xticks(tick_marks, range(1, num_classes + 1))
    plt.yticks(tick_marks, range(1, num_classes + 1))
    plt.xlabel('Predicted Label')
    plt.ylabel('True Label')

    thresh = cm.max() / 2.0
    for i in range(num_classes):
        for j in range(num_classes):
            plt.text(j, i, format(cm[i, j], 'd'),
                    horizontalalignment="center",
                    color="white" if cm[i, j] > thresh else "black")

    plt.tight_layout()
    plt.show()