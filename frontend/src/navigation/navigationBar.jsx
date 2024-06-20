import { Text, Image, View, Platform, StyleSheet } from "react-native";
import { Button } from "@rneui/themed";
import Icon from "react-native-vector-icons/FontAwesome";
import { COLORS } from "../common/theme";
import { useTheme } from "@rneui/themed";
import { makeStyles } from "@rneui/themed";
import { IS_WEB } from "../common/utils";

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: "#283618",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    width: "100vw",
    color: theme.colors.primary,
    height: "fit-content",
  },
  sidebarContainer: {
    backgroundColor: "#283618",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    height: "100vh",
    color: theme.colors.primary,
    width: "fit-content",
  },
}));
const NavigationBarIcon = ({ icon, name, path, onClick, isSelected }) => {
  const { theme } = useTheme();
  let style = {
    flex: IS_WEB ? "none" : 1,
    borderTopWidth: !IS_WEB ? 4 : 0,
    borderRightWidth: IS_WEB ? 4 : 0,
    borderTopColor: isSelected ? "#616a52" : "rgb(40, 54, 24)",
    borderRightColor: isSelected ? "#616a52" : "rgb(40, 54, 24)",
    width: "100%",
  };

  return (
    <View style={style}>
      <Button
        onPress={onClick}
        icon={
          <Icon
            name={icon}
            size={24}
            color={isSelected ? "#e3e7db" : "white"}
          />
        }
        type="clear"
        style={{ width: "100%", padding: 20 }}
      />
    </View>
  );
};
export const NavigationBar = ({ activeView, views, setActiveView }) => {
  const styles = useStyles();
  return (
    <View style={styles.container}>
      {views.map((v) => (
        <NavigationBarIcon
          isSelected={activeView === v.path}
          {...v}
          key={v.path}
          onClick={() => setActiveView(v.path)}
        />
      ))}
    </View>
  );
};

export const NavigationSidebar = ({ activeView, views, setActiveView }) => {
  const styles = useStyles();
  return (
    <View style={styles.sidebarContainer}>
      {views.map((v) => (
        <NavigationBarIcon
          isSelected={activeView === v.path}
          {...v}
          key={v.path}
          onClick={() => setActiveView(v.path)}
        />
      ))}
    </View>
  );
};
