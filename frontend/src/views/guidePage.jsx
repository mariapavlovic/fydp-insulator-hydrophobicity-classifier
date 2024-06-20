import { React, useContext, useEffect, useState } from "react";
import { AppContext } from "../appContext";
import Icon from "react-native-vector-icons/FontAwesome6";
import { View, StyleSheet } from "react-native";
import { Text, Button } from "@rneui/themed";
import { useTheme } from "@rneui/themed";
import { ROUTES } from "../common/routes";
import { LoadableImage } from "../common/components/loadableImage";

const styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e3e7db",
    padding: 10,
    textAlign: "left",
    width: "100vw",
  },
  header: {
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "left",
  },

  prompt: {
    paddingTop: 50,
    fontSize: 16,
    textAlign: "center",
  },
  imageStyle: {
    width: 350,
    height: 200,
  },
});

export const GuidePageView = () => {
  const { setActiveView } = useContext(AppContext);
  const { theme } = useTheme();

  const goHome = () => {
    setActiveView(ROUTES.HOME);
  };
  return (
    <View style={styles.homeContainer}>
      <View
        style={{
          alignSelf: "left",
          width: "fit-content",
          flexDirection: "row",
          flexGrow: 1,
        }}
      >
        <Button
          type="clear"
          onPress={goHome}
          icon={
            <Icon name="arrow-left" color={theme.colors.primary} size={20} />
          }
          buttonStyle={{ alignSelf: "left", width: "fit-content", padding: 10, backgroundColor: "white", borderRadius: "100%" }}
        />
      </View>
      <View style={{ flexGrow: 1 }}>
        <Text h1 style={styles.header}>Quick Starter Guide</Text>
        <Text>Uploaded images should: </Text>
        <Text>• Have good lighting </Text>
        <Text>• Be cropped to water droplets </Text>
        <Text>
          • Have the insulator only in the background
        </Text>
        <Text style={styles.prompt}>
          An example of a good image is found below.
        </Text>
        <LoadableImage
          style={styles.imageStyle}
          source={require("../images/indoor_1.png")}
        />
      </View>
    </View>
  );
};
