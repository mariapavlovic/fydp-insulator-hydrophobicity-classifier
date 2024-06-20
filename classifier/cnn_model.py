from preprocessing import preprocess_images
from efficientnet.keras import EfficientNetB0
from keras.models import Sequential
from keras.layers import Conv2D, MaxPooling2D, Flatten, Dense
from utils import NUM_CLASSES, collect_image_paths, populate_formatted_image_array, generate_training_labels
from utils import IMAGE_HEIGHT, IMAGE_WIDTH, ROOT_DIR, EXCLUDED_FOLDERS

# collecting data on training/testing images used, populating arrays for paths of selected training/testing images
num_images_used_train, _, selected_image_paths_train, _ = collect_image_paths(ROOT_DIR, EXCLUDED_FOLDERS)

train_images = populate_formatted_image_array(selected_image_paths_train)

image_height = IMAGE_HEIGHT
image_width = IMAGE_WIDTH
num_classes = NUM_CLASSES
num_channels = 3
num_epochs = 10
batch_size = 32

train_labels = generate_training_labels(selected_image_paths_train)

base_model = EfficientNetB0(weights='imagenet', include_top=False, input_shape=(image_height, image_width, num_channels))
model = Sequential()
model.add(base_model)
model.add(Flatten())
model.add(Dense(units=128, activation='relu'))
model.add(Dense(units=num_classes, activation='softmax'))
model.compile(optimizer='adam', loss='sparse_categorical_crossentropy', metrics=['accuracy'])
model.fit(train_images, train_labels, epochs=num_epochs, batch_size=batch_size)

# Save model - don't retrain
model.save('cnn_model_v2.h5')