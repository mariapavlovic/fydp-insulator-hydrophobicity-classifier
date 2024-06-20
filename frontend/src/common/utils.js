import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";
const lzstring = require("lz-string");
const URI_CHUNK = 65536;
import { uploadImage, getClassification } from "./requests";
export const generateUriKeys = (base, count) => [
  ...[...Array(count).keys()].map((i) => `${base}-URI-${i}`),
];

export const IS_WEB = Platform.OS === "web";
export const IMAGE_CAP = 20;
export const IMAGE_SIZE = Platform.OS === "web" ? 150 : 120;
export const getEntry = async (key) => {
  const data = await AsyncStorage.getItem(key);
  if(!data) {
    return null;
  }
  return JSON.parse(data);
};

export const uriToBlob = async (uri) => fetch(uri)
.then(res => res.blob())

export const saveImageToLocal = async (data) => {
  const date = new Date();
  const entryKey = uuidv4();
  const entry = JSON.stringify({
    classification: data.classification,
    confidence: data.confidence,
    date,
    uri: data.uri,
    key: entryKey,
    title: "Untitled",
  });

  let historyKeys = await AsyncStorage.getItem("uploadHistoryKeys");

  const updatedHistoryKeys = historyKeys
    ? [entryKey, ...JSON.parse(historyKeys)]
    : [entryKey];

  AsyncStorage.multiSet([[entryKey, entry], ["uploadHistoryKeys", JSON.stringify(updatedHistoryKeys)]]);
  return entryKey;
};

export const toDataURL = (url, callback) => {
  //https://stackoverflow.com/questions/6150289/how-can-i-convert-an-image-into-base64-string-using-javascript
  var xhr = new XMLHttpRequest();
  xhr.onload = function () {
    var reader = new FileReader();
    reader.onloadend = function () {
      callback(reader.result);
    };
    reader.readAsDataURL(xhr.response);
  };
  xhr.open("GET", url);
  xhr.responseType = "blob";
  xhr.send();
}

const uploadEntry = async (uri) => {
  const promises = [];
  // promises.push(uploadImage({blob: uri}));
  promises.push(getClassification({blob: uri}));

  return Promise.all(promises);
}

export const createEntry = async (asset, callback = () => {}) => {
  const { uri } = asset;
  if (IS_WEB) {
    return uploadEntry(uri).then(
      (res) => callback({uri: res[0].s3_uri, ...res[1]}));
  } else {
    return toDataURL(uri, async (newUri) => {
      uploadEntry(newUri).then(
        (res) => callback({uri: res[0].s3_uri, ...res[1]}));
      });
  }
}

export const createMultiEntry = async (assets, callback) => {
  const promises = [];
  assets.forEach((a) => promises.push(createEntry(a, callback)));

  return await Promise.all(promises);
}

// https://stackoverflow.com/questions/105034/how-do-i-create-a-guid-uuid
export const uuidv4 = () => {
  return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  );
}
