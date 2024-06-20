import os
import cv2
import imgaug as ia
from imgaug import augmenters as iaa

def preprocess_images(input_folder, output_folder, augmentation):
    augmenter = augmentation

    if not os.path.exists(output_folder):
        os.makedirs(output_folder)

    for filename in os.listdir(input_folder):
        if filename.lower().endswith((".jpg", ".jpeg")):
            image_path = os.path.join(input_folder, filename)
            augmented_image_path = os.path.join(output_folder, filename)

            if not os.path.exists(augmented_image_path):
                image = cv2.imread(image_path)
                augmented_image = augmenter.augment_image(image)
                cv2.imwrite(augmented_image_path, augmented_image)


augmentations = [
    iaa.Grayscale(),
    iaa.Affine(rotate=(-45, 45), mode='reflect', order=3, cval=0),
    iaa.GammaContrast(gamma=(0.5, 1.5)),
    iaa.Fliplr(1.0),
    iaa.AdditiveGaussianNoise(scale=(0, 0.1 * 255), per_channel=True),
    iaa.Affine(scale={"x": (0.8, 1.2), "y": (0.8, 1.2)}, mode='reflect', order=3, cval=0)
]

folders = [
    "dataset/indoor/1",
    "dataset/indoor/2",
    "dataset/indoor/3",
    "dataset/indoor/4",
    "dataset/indoor/5",
    "dataset/indoor/5+",
    "dataset/indoor/6",
    "dataset/outdoor/1",
    "dataset/outdoor/2",
    "dataset/outdoor/3",
    "dataset/outdoor/4",
    "dataset/outdoor/5",
    "dataset/outdoor/5+",
    "dataset/outdoor/6"
]

for folder in folders:
    input_folder = os.path.join(folder, "original", "original_only")
    grayscale_output_folder = os.path.join(folder, "grayscale", "grayscale_only")
    rotation_output_folder = os.path.join(folder, "original", "rotated")
    contrast_output_folder = os.path.join(folder, "original", "contrast")
    flipped_output_folder = os.path.join(folder, "original", "flipped")
    noisy_output_folder = os.path.join(folder, "original", "noisy")
    scaled_output_folder = os.path.join(folder, "original", "scaled")

    preprocess_images(input_folder, grayscale_output_folder, augmentations[0])
    preprocess_images(input_folder, rotation_output_folder, augmentations[1])
    preprocess_images(input_folder, contrast_output_folder, augmentations[2])
    preprocess_images(input_folder, flipped_output_folder, augmentations[3])
    preprocess_images(input_folder, noisy_output_folder, augmentations[4])
    preprocess_images(input_folder, scaled_output_folder, augmentations[5])

    contrast_flipped_output_folder = os.path.join(folder, "original", "contrast_flipped")
    contrast_rotation_output_folder = os.path.join(folder, "original", "contrast_rotated")
    noisy_flipped_output_folder = os.path.join(folder, "original", "noisy_flipped")
    noisy_rotation_output_folder = os.path.join(folder, "original", "noisy_rotated")
    rotation_flipped_output_folder = os.path.join(folder, "original", "rotated_flipped")
    scaled_flipped_output_folder = os.path.join(folder, "original", "scaled_flipped")
    scaled_rotation_output_folder = os.path.join(folder, "original", "scaled_rotated")

    preprocess_images(contrast_output_folder, contrast_flipped_output_folder, augmentations[3])
    preprocess_images(contrast_output_folder, contrast_rotation_output_folder, augmentations[1])
    preprocess_images(noisy_output_folder, noisy_flipped_output_folder, augmentations[3])
    preprocess_images(noisy_output_folder, noisy_rotation_output_folder, augmentations[1])
    preprocess_images(rotation_output_folder, rotation_flipped_output_folder, augmentations[3])
    preprocess_images(scaled_output_folder, scaled_flipped_output_folder, augmentations[3])
    preprocess_images(scaled_output_folder, scaled_rotation_output_folder, augmentations[1])

    input_folder = os.path.join(folder, "grayscale", "grayscale_only")
    rotation_output_folder = os.path.join(folder, "grayscale", "rotated")
    contrast_output_folder = os.path.join(folder, "grayscale", "contrast")
    flipped_output_folder = os.path.join(folder, "grayscale", "flipped")
    noisy_output_folder = os.path.join(folder, "grayscale", "noisy")
    scaled_output_folder = os.path.join(folder, "grayscale", "scaled")

    preprocess_images(input_folder, rotation_output_folder, augmentations[1])
    preprocess_images(input_folder, contrast_output_folder, augmentations[2])
    preprocess_images(input_folder, flipped_output_folder, augmentations[3])
    preprocess_images(input_folder, noisy_output_folder, augmentations[4])
    preprocess_images(input_folder, scaled_output_folder, augmentations[5])

    contrast_flipped_output_folder = os.path.join(folder, "grayscale", "contrast_flipped")
    contrast_rotation_output_folder = os.path.join(folder, "grayscale", "contrast_rotated")
    noisy_flipped_output_folder = os.path.join(folder, "grayscale", "noisy_flipped")
    noisy_rotation_output_folder = os.path.join(folder, "grayscale", "noisy_rotated")
    rotation_flipped_output_folder = os.path.join(folder, "grayscale", "rotated_flipped")
    scaled_flipped_output_folder = os.path.join(folder, "grayscale", "scaled_flipped")
    scaled_rotation_output_folder = os.path.join(folder, "grayscale", "scaled_rotated")

    preprocess_images(contrast_output_folder, contrast_flipped_output_folder, augmentations[3])
    preprocess_images(contrast_output_folder, contrast_rotation_output_folder, augmentations[1])
    preprocess_images(noisy_output_folder, noisy_flipped_output_folder, augmentations[3])
    preprocess_images(noisy_output_folder, noisy_rotation_output_folder, augmentations[1])
    preprocess_images(rotation_output_folder, rotation_flipped_output_folder, augmentations[3])
    preprocess_images(scaled_output_folder, scaled_flipped_output_folder, augmentations[3])
    preprocess_images(scaled_output_folder, scaled_rotation_output_folder, augmentations[1])