import { View } from "react-native";
import { Text } from "@rneui/themed";
const CLASSIFICATION_SETTINGS = Object.freeze({
  6: {
    color: "#bc0000",
    text: "Bad",
  },
  5: {
    color: "#bc0000",
    text: "Bad",
  },
  4: {
    color: "#ffaa00",
    text: "Moderate",
  },
  3: {
    color: "#ffaa00",
    text: "Moderate",
  },
  2: {
    color: "#42b223",
    text: "Good",
  },
  1: {
    color: "#42b223",
    text: "Good",
  },
});
export const Chip = ({ classification }) => {
  if (!classification || classification <= 0 || classification > 6) {
    return null;
  }
  return (
    <>
      <Text
        style={{
          fontSize: 16,
          fontWeight: "bold",
          textTransform: "uppercase",
        }}
      >
        {classification}
      </Text>
      <View
        style={{
          borderRadius: 50,
          backgroundColor:
            CLASSIFICATION_SETTINGS[classification].color || "transparent",
          justifyContent: "center",
          alignContent: "center",
          alignItems: "center",
          paddingHorizontal: 10,
          alignSelf: "stretch",
        }}
      >
        <Text
          style={{
            fontSize: 12,
            fontWeight: "bold",
            color: "white",
            textTransform: "uppercase",
          }}
        >
          {CLASSIFICATION_SETTINGS[classification].text}
        </Text>
      </View>
    </>
  );
};
