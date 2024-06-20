import { View } from "react-native-web";

export const ViewContainer = ({ children }) => (
  <View
    style={{
      padding: "32px, 0",
      flexGrow: 1,
      borderRadius: 20,
      overflow: "hidden",
      flexGrow: 1,
    }}
  >
    {children}
  </View>
);
