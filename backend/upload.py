import requests
import os

# Replace 'http://localhost:5000/upload' with your actual endpoint URL
url = 'http://localhost:5000/upload'

# Path to the file you want to upload

file_path = 'peepoShy1.png'
data = {
    'uploader_id': 1234,
    'classification': 1,
    'platform': 'Web'
}

# file_path = 'dice.png'
# data = {
#     'uploader_id': 4231,
#     'classification': 2,
#     'platform': 'Mobile'
# }
# Open the file in binary mode and read its content
with open(file_path, 'rb') as file:
    # Create a dictionary with the file data
    files = {'file': (file.name, file, 'image/png')}
    print("file size", files.__sizeof__())
    print("os file size", os.path.getsize(file_path))

    # Send the POST request with the file attached
    response = requests.post(url, files=files, data=data)

# Check the response
if response.status_code == 201:
    print(response.text)
else:
    print("Failed to upload file. Error:", response.text)

# SECOND FILE
    
file_path = 'peepoShy.png'
data = {
    'uploader_id': 1235,
    'classification': 1,
    'platform': 'Web'
}

with open(file_path, 'rb') as file:
    # Create a dictionary with the file data
    files = {'file': (file.name, file, 'image/png')}
    print("file size", files.__sizeof__())
    print("os file size", os.path.getsize(file_path))

    # Send the POST request with the file attached
    response = requests.post(url, files=files, data=data)

# Check the response
if response.status_code == 201:
    print(response.text)
else:
    print("Failed to upload file. Error:", response.text)
