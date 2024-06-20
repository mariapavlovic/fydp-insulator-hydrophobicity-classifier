import { View, Image } from "react-native";
import { useState } from "react";
import { ActivityIndicator } from "react-native";

export const LoadableImage = ({ source, style }) => {
  const [loading, setLoading] = useState(true);
  //https://stackoverflow.com/questions/35265751/image-preloading-in-react-native
  return (
    <View style={{ backgroundColor: "rgb(209, 216, 196)" }}>
      <Image
        onLoadStart={() => setLoading(true)}
        onLoadEnd={() => setLoading(false)}
        source={source}
        style={style}
      />
      <ActivityIndicator
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
          zIndex: -1,
        }}
        animating={loading}
      />
    </View>
  );
};
