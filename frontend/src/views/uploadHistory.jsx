import { useContext, useEffect, useState } from "react";
import { Image, View, StyleSheet, ScrollView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  IMAGE_CAP,
  IMAGE_SIZE,
  IS_WEB,
  getImageURIByMetadata,
} from "../common/utils";
import { Bold, Title, Header } from "../common/components/text";
import { Chip } from "../common/components/chip";
import Icon from "react-native-vector-icons/FontAwesome6";
import { Button, Text, useTheme } from "@rneui/themed";
import { AppContext } from "../appContext";
import { LoadableImage } from "../common/components/loadableImage";

const styles = StyleSheet.create({
  historyContainer: {
    alignItems: "center",
    justifyContent: "start",
    overflow: "hidden",
    width: "100%",
    padding: 24,
    backgroundColor: "#e3e7db",
  },
  entry: {
    display: "flex",
    gridGap: 10,
    gap: 10,
    flexDirection: "row",
    justifyContent: "start"
  },
  entryContent: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  entryList: IS_WEB ? {
    display: 'grid',
    gridTemplateColumns: "repeat(auto-fit, minmax(400px, 30%))",
    gap: 24,
    width: "100%",
    overflow: "auto"
  } : {
    display: "flex",
    flexDirection: "column",
    flexWrap: "wrap",
    overflow: "auto",
    gap: 24,
    width: "100%",
  },
  buttonTitle: {
    fontSize: 14,
    marginLeft: 12,
  },
  metadataLine: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
    marginBottom: 2,
    alignContent: "center",
  },
});

export const UploadHistoryEntry = ({
  uri,
  title,
  classification,
  confidence,
  date,
  onClick,
}) => {
  return (
    <Button buttonStyle={styles.entry} onPress={onClick} type="clear">
      <LoadableImage
        source={{ uri }}
        style={{ width: IMAGE_SIZE, height: IMAGE_SIZE }}
      />
      <View style={styles.entryContent}>
        <Header>{title || "Untitled"}</Header>
        <View style={{ gap: 5 }}>
          <View style={styles.metadataLine}>
            <Icon name="chart-simple" size={20} />
            <Chip classification={classification} />
          </View>

          <View style={styles.metadataLine}>
            <Icon name="bullseye" size={20} />
            <Text style={{ lineHeight: 21, fontSize: 18 }}>{confidence}%</Text>
          </View>
          <View style={styles.metadataLine}>
            <Icon name="calendar" size={22} />
            <Text style={{ lineHeight: 23, fontSize: 18 }}>
              {new Date(date).toISOString().split("T")[0]}
            </Text>
          </View>
        </View>
      </View>
    </Button>
  );
};

const getUploadHistory = async () => {
  const keys = await AsyncStorage.getItem("uploadHistoryKeys");
  console.log({keys})
  if (!keys) return [];

  const entries = await AsyncStorage.multiGet(JSON.parse(keys));

  return entries.map(([_, value]) => JSON.parse(value)).filter((e) => e !== null && e !== undefined);
};

const HistoryControlsButton = ({ color, icon, titleStyle, onPress, title }) => (
  <Button
    size="lg"
    onPress={onPress}
    icon={<Icon name={icon} color={color} size={24} />}
    title={IS_WEB ? title : ""}
    titleStyle={titleStyle}
    type="clear"
  />
);

export const UploadHistoryView = () => {
  const [history, setHistory] = useState([]);
  const { openUpload } = useContext(AppContext);
  const { theme } = useTheme();
  const updateHistory = () => getUploadHistory().then((h) => setHistory(h));

  const clearHistory = () => {
    AsyncStorage.clear().then((_) => updateHistory());
  };

  useEffect(() => {
    updateHistory();
  }, []);

  const CONTROLS = [
    {
      title: "Refresh History",
      icon: "arrows-rotate",
      onPress: updateHistory,
    },
    {
      title: "Clear History",
      icon: "trash",
      onPress: clearHistory,
    },
  ];

  return (
    <ScrollView style={{ padding: "3em" }}>
      <View style={styles.historyContainer}>
        <View
          style={{
            alignContent: "left",
            width: "100%",
            display: "flex",
            flexDirection: "row",
            backgroundColor: "#e3e7db",
          }}
        >
          <View style={{ flexGrow: 1, marginBottom: 24 }}>
            <Header>Upload History</Header>
            <Text>Your last {IMAGE_CAP} uploads</Text>
          </View>
          <View style={{ alignContent: "flex-end", flexDirection: "row" }}>
            {CONTROLS.map((c) => (
              <HistoryControlsButton
                {...c}
                color={theme.colors.primary}
                titleStyle={styles.buttonTitle}
                key={c.title}
              />
            ))}
          </View>
        </View>
        <View style={styles.entryList}>
          {history.map((h) => (
            <UploadHistoryEntry {...h} key={h.key} onClick={() => openUpload(h.key)} />
          ))}
        </View>
      </View>
    </ScrollView>
  );
};
