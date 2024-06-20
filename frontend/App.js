import { ActivityIndicator, View } from "react-native";
import React from "react";
import { Container } from "./src/main";
import { AppContext } from "./src/appContext";
import { useAppContext } from "./src/hooks/useAppContext";
import { ThemeProvider } from "@rneui/themed";
import { AppTheme } from "./src/common/theme";
import { useFonts } from "expo-font";

export const App = () => {
  const appContext = useAppContext();
  const [fontsLoaded] = useFonts({
    "Inter Medium": require("./assets/fonts/InterDisplay-Regular.otf"),
    "Inter Bold": require("./assets/fonts/InterDisplay-Bold.otf"),
  });
  if (!fontsLoaded) {
    return <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        width: "100vw",
        height: "100vh",
        backgroundColor: "#e3e7db",
        fontSize: 16,
      }}
    >
      <ActivityIndicator size={"large"} />
    </View>;
  }
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        width: "100vw",
        height: "100vh",
        backgroundColor: "#e3e7db",
        fontSize: 16,
      }}
    >
      <ThemeProvider theme={AppTheme}>
        <AppContext.Provider value={appContext}>
          <Container />
        </AppContext.Provider>
      </ThemeProvider>
    </View>
  );
};

export default App;
