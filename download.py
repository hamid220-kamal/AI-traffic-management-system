import urllib.request
url = 'https://github.com/intel-iot-devkit/sample-videos/raw/master/car-detection.mp4'
print(f"Downloading from {url}...")
urllib.request.urlretrieve(url, 'highway.mp4')
print("Successfully downloaded highway.mp4")
