from matplotlib import pyplot as plt
import numpy as np
import keras

from keras.models import load_model
from efficientnet.tfkeras import EfficientNetB0
from utils import EXCLUDED_FOLDERS, NUM_CLASSES, ROOT_DIR, collect_image_paths, generate_training_labels, plot_confusion_matrix, populate_formatted_image_array

_, num_images_used_test, _, selected_image_paths_test = collect_image_paths(ROOT_DIR, EXCLUDED_FOLDERS, for_testing=True)
test_images = populate_formatted_image_array(selected_image_paths_test)
test_labels = generate_training_labels(selected_image_paths_test)

model = load_model('cnn_model.keras')

# Evaluation
test_loss, test_accuracy = model.evaluate(test_images, test_labels)
print('Test Loss:', test_loss)
print('Test Accuracy:', test_accuracy)

# Predictions
predictions = model.predict(test_images)
confidence = np.max(predictions, axis=1)
predicted_labels = np.argmax(predictions, axis=1)

# Plot confusion matrix
plot_confusion_matrix(test_labels, predicted_labels, NUM_CLASSES)

plt.figure(figsize=(10,7))
plt.hist(confidence, bins=10, alpha=0.7)
plt.title("Distribution of Confidence Scores")
plt.xlabel("Confidence Score")
plt.ylabel("Frequency")
plt.show()

    # prediction with confidence level for a single image
# confidence_score = np.max(model.predict(image))
# predicted_class = np.argmax(model.predict(image))