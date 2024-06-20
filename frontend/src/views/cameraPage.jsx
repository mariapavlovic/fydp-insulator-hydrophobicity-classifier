import React, { useState, useContext } from "react";
import { View, StyleSheet, Text, ActivityIndicator } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { createEntry } from "../common/utils";
import { saveImageToLocal } from "../common/utils";
import { AppContext } from "../appContext";
import Icon from "react-native-vector-icons/FontAwesome";
import { Button } from "@rneui/themed";
import { Progress } from "../common/components/progress";

export const CameraPageView = () => {
  const [loading, setLoading] = useState(false);
  const { openUpload } = useContext(AppContext);
  const [permission, requestPermission] = ImagePicker.useCameraPermissions();

  const takePicture = async () => {
    if (!permission.granted)  {
      await requestPermission();
      return;
    }

    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setLoading(true);
      createEntry(result.assets[0], async (e) => {
        const imageKey = await saveImageToLocal(e);
        setLoading(false);
        openUpload(imageKey);
      })
    }
  };

  return (
    <View style={styles.container}>
      {loading && <Progress/>}
      {!loading && <Button onPress={takePicture} buttonStyle={styles.button} type="clear">
        <Icon name="camera" size={128} />
        <Text>Click to take a photo from camera</Text>
      </Button>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    height: "100%",
    backgroundColor: "#e3e7db",
  },
  picture: {
    width: 200,
    height: 200,
    marginTop: 20,
  },
  button: {
    display: "flex",
    flexDirection: "column",
  },
});
