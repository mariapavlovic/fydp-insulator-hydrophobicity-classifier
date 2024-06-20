import { useTheme } from "@rneui/themed";
import { View, StyleSheet, Linking } from "react-native";
import { Text } from "@rneui/themed";
import Icon from "react-native-vector-icons/FontAwesome";
import { IS_WEB } from "../common/utils";
import { Button } from "@rneui/themed";
import { AppContext } from "../appContext";
import { useContext } from "react";
import { ROUTES } from "../common/routes";

const styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e3e7db",
  },
  webHomeContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e3e7db",
    display: "grid",
    gridTemplateColumns: "1fr auto",
    height: "100%",
    maxWidth: 1000,
    width: "80%",
    margin: "auto",
  },
  footerContainer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    paddingVertical: 20,
    alignItems: "center",
  },
  header: {
    fontSize: 24,
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 20,
  },
  webHeader: {
    fontSize: 30,
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 20,
    color: "black",
  },
  prompt: {
    fontSize: 14,
    textAlign: "center",
  },
  description: {
    marginHorizontal: 30,
    padding: 5,
    color: "white",
    fontSize: 16,
    textAlign: "center",
  },
  webDescription: {
    marginBottom: 50,
    fontSize: 16,
    textAlign: "center",
    flexWrap: "wrap",
  },
  homeButtons: {
    margin: 12,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#d1d8c4",
    borderWidth: 2,
    borderRadius: 15,
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderColor: "#616a52",
    marginTop: 20,
  },
  buttonContainer: {
    justifyContent: "center",
    flexDirection: "column",
  },
  webTextContainer: {
    margin: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#d1d8c4",
    borderWidth: 2,
    borderRadius: 15,
    paddingVertical: 50,
    paddingHorizontal: "5%",
    borderColor: "#616a52",
  },
});

export const HomePageView = () => {
  const { theme } = useTheme();

  const { activeView, setActiveView } = useContext(AppContext);

  const goHistory = () => {
    setActiveView(ROUTES.HISTORY);
  };

  const goUpload = () => {
    setActiveView(ROUTES.UPLOAD);
  };

  const goGithub = () => {
    Linking.openURL(
      "https://github.com/DanielT504/deep-learning-defect-detection"
    );
  };

  const goGuide = () => {
    setActiveView(ROUTES.GUIDE);
  };

  if (IS_WEB) {
    return (
      <View style={styles.webHomeContainer}>
        <View style={styles.webTextContainer}>
          <Text h1>AI INSULATOR INSPECTOR</Text>
            <Text style={styles.webDescription}>An ECE'24 FYDP Project</Text>
          <Icon name="clipboard" color="black" size={50}></Icon>
        </View>
        <View style={styles.buttonContainer}>
          <View style={styles.homeButtons}>
            <Button type="clear" onPress={goGithub}>
              <Icon name="github" color="black" size={20} /> ML Github Repo{" "}
            </Button>
          </View>
          <View style={styles.homeButtons}>
            <Button type="clear" onPress={goUpload}>
              <Icon name="upload" color="black" size={20} /> Upload{" "}
            </Button>
          </View>
          <View style={styles.homeButtons}>
            <Button type="clear" onPress={goHistory}>
              <Icon name="folder-open" color="black" size={20} /> View History{" "}
            </Button>
          </View>
        </View>
      </View>
    );
  }
  return (
    <View style={styles.homeContainer}>
      <Text h1 style={styles.header}>
        AI INSULATOR INSPECTOR
      </Text>
      <View style={{ backgroundColor: "rgb(40, 54, 24)", borderRadius: 10, marginBottom: 50, padding: 5 }}>
        <Text style={styles.description}>An ECE'24 FYDP Project</Text>
      </View>
      <View style={styles.buttonContainer}>
        <View style={styles.homeButtons}>
          <Button type="clear" onPress={goGithub}>
            <Icon name="github" color="black" size={20} /> Visit ML Github Repo{" "}
          </Button>
        </View>
        <View style={styles.homeButtons}>
          <Button type="clear" onPress={goGuide}>
            <Icon name="file" color="black" size={20} /> Quick Starter Guide{" "}
          </Button>
        </View>
      </View>
      <View style={styles.footerContainer}>
        <Text style={styles.prompt}>
          Select from below to get started {"\n"}
        </Text>
        <Icon name="arrow-down" color={theme.colors.primary} size={20} />
      </View>
    </View>
  );
};
