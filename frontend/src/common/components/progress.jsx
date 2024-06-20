import { Text, LinearProgress } from "@rneui/themed";
import { View } from "react-native";

export const Progress = () => (
  <View style={{alignItems: "center", width: 350}}>
    <Text h1>Loading...</Text>
    <LinearProgress
      style={{ marginVertical: 10 }}
      color="green"
    />
  </View>
);
