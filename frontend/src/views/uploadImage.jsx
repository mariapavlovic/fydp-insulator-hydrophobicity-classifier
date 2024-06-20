import { View, ActivityIndicator } from "react-native";
import { useState, useContext } from "react";
import * as ImagePicker from "expo-image-picker";
import { IS_WEB, createEntry, saveImageToLocal } from "../common/utils";
import { Button, Text, LinearProgress } from "@rneui/themed";
import Icon from "react-native-vector-icons/FontAwesome6";
import { AppContext } from "../appContext";
import { ROUTES } from "../common/routes";
import { Progress } from "../common/components/progress";

export const UploadImageView = () => {
  const [loading, setLoading] = useState(false);
  const { openUpload, setActiveView } = useContext(AppContext);
  const pickImageMulti = async () => {
    let results = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsMultipleSelection: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!results.canceled) {
      setLoading(true);
      await Promise.all(results.assets.map(asset =>  createEntry(asset, async (e) => {
        await saveImageToLocal(e);
      })));
      setLoading(false);
      setActiveView(ROUTES.HISTORY);

    }
  };
  const pickImageSingle = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setLoading(true);
      createEntry(result.assets[0], async (entry) => {
        const imageKey = await saveImageToLocal(entry);
        setLoading(false);
        openUpload(imageKey);
      })
    }
  };

  return (
    <View
      style={{
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        alignSelf: "center",
        height: "100%",
        backgroundColor: "#e3e7db",
        flexDirection: "row",
        flex: 1,
        gap: 20,
      }}
    >
      {loading && <Progress/>}
      {!loading && (
        <>
          <Button
            onPress={pickImageSingle}
            buttonStyle={{ display: "flex", flexDirection: "column" }}
            type="clear"
          >
            <Icon name="image" size={128} />
            <Text>Upload single image</Text>
          </Button>
          <Button
            onPress={pickImageMulti}
            buttonStyle={{ display: "flex", flexDirection: "column" }}
            type="clear"
          >
            <Icon name="images" size={128} />
            <Text>Upload multiple</Text>
          </Button>
        </>
      )}
    </View>
  );
};
