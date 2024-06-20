import { React, useContext, useEffect, useState } from "react";
import {
  ScrollView,
  View,
  Image,
  StyleSheet,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { AppContext } from "../appContext";
import { getImageURIByentry, getEntry, IS_WEB } from "../common/utils";
import { Bold, Header } from "../common/components/text";
import { Button, Text } from "@rneui/themed";
import Icon from "react-native-vector-icons/FontAwesome6";
import { useTheme } from "@rneui/themed";
import { ROUTES } from "../common/routes";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Chip } from "../common/components/chip";
import { LoadableImage } from "../common/components/loadableImage";

export const ClassificationPageView = () => {
  const { activeUploadKey } = useContext(AppContext);
  const [image, setImage] = useState(null);
  const [entry, setEntry] = useState(null);
  const { theme } = useTheme();
  const [loading, setLoading] = useState(true);
  const { setActiveView } = useContext(AppContext);

  const update = async (key) => {
    setLoading(true);
    const e = await getEntry(key);
    console.log({ e });

    if (e === null || e === undefined) {
      setActiveView(ROUTES.HISTORY);
    }
    setEntry(e);
    setImage(e.uri);
    setLoading(false);
  };

  useEffect(() => {
    update(activeUploadKey);
  }, [activeUploadKey]);

  const goHistory = () => {
    setActiveView(ROUTES.HISTORY);
  };

  const [isEditing, setIsEditing] = useState(false);
  const [title, setNewTitle] = useState("Enter new title");

  useEffect(() => {
    setNewTitle(entry?.title ?? "Untitled");
  }, [entry]);

  const goSubmit = () => {
    setIsEditing(false);
    if (title.length > 0) {
      const newEntry = { ...entry, title };
      AsyncStorage.setItem(activeUploadKey, JSON.stringify(newEntry));
      setEntry(newEntry);
    }
  };

  if (loading) {
    return (
      <ScrollView style={{ padding: "5%", overflow: "auto", flexGrow: "none" }}>
        <View style={{ alignContent: "flex-end", flexDirection: "row" }}>
          <Button
            type="clear"
            onPress={goHistory}
            icon={
              <Icon name="arrow-left" color={theme.colors.primary} size={20} />
            }
            titleStyle={styles.buttonTitle}
          />
        </View>

        <View>
          <ActivityIndicator size={"large"} />
        </View>
      </ScrollView>
    );
  }
  return (
    <ScrollView style={{ padding: "5%", overflow: "auto", flexGrow: "none" }}>
      <View style={{ alignContent: "flex-end", flexDirection: "row" }}>
        <Button
          type="clear"
          onPress={goHistory}
          icon={
            <Icon name="arrow-left" color={theme.colors.primary} size={20} />
          }
          titleStyle={styles.buttonTitle}
        />
      </View>
      <View>
        {isEditing ? (
          <View style={styles.title}>
            <TextInput
              style={styles.inputBox}
              onChangeText={(v) => setNewTitle(v)}
              value={title}
              placeholder={entry?.title ?? "Untitled"}
              maxLength={32}
            />
            <Button
              type="clear"
              onPress={goSubmit}
              icon={
                <Icon
                  name="circle-check"
                  color={theme.colors.primary}
                  size={30}
                />
              }
              titleStyle={styles.buttonTitle}
            />
          </View>
        ) : (
          <View style={styles.title}>
            <Header style={{ paddingVertical: 8 }}>
              {entry?.title ?? "Untitled"}
            </Header>
            <Button
              type="clear"
              onPress={() => setIsEditing(true)}
              icon={<Icon name="edit" color={theme.colors.primary} size={30} />}
              titleStyle={styles.buttonTitle}
            />
          </View>
        )}
      </View>
      {image && (
        <View style={{ marginTop: 20, marginBottom: 20 }}>
          <LoadableImage
            source={{ uri: image }}
            style={{ width: "100%", height: 400 }}
          />
        </View>
      )}
      {entry && (
        <View style={{ width: "100%", gap: 5 }}>
          <View style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
            <Icon name="chart-simple" size={20} />
            <Bold>Classification Level:</Bold>
            <Chip classification={entry.classification} />
          </View>
          <View style={{ flexDirection: "row", gap: 8, alignItems: "center" }}>
            <Icon name="bullseye" size={20} />
            <Bold>Confidence Rating:</Bold>
            <Text>{entry.confidence}%</Text>
          </View>
          <View style={{ flexDirection: "row", gap: 8, alignItems: "center" }}>
            <Icon name="calendar" size={20} />
            <Bold>Date Uploaded:</Bold>
            <Text>{new Date(entry.date).toISOString().split("T")[0]}</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "flex-start",
              padding: 15,
              gap: 10,
              backgroundColor: "rgb(209, 216, 196)",
              borderRadius: 10,
              marginTop: 10,
              width: "100%",
            }}
          >
            <View
              style={{
                backgroundColor: "rgb(40, 54, 24)",
                borderRadius: "100%",
                padding: 2,
                width: 24
              }}
            >
              <Icon
                name="circle-info"
                size={20}
                color={"rgb(209, 216, 196)"}
                style={{ width: "fit-content" }}
              />
            </View>
            <View style={{flexShrink: 1, alignSelf: "center"}}>
              <Text style={{ fontSize: 16, flexShrink: 1, color:"rgb(40, 54, 24)" }}>
                Hydrophobicity levels range from 1 - 6 depending on the state of
                the polymer insulator. A rating of 1 is the best, while a rating
                of 6 is bad and the insulator should be replaced.
              </Text>
            </View>
          </View>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  buttonTitle: {
    fontSize: 14,
    marginLeft: 12,
  },
  title: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },
  inputBox: IS_WEB
    ? {
        width: "fit-content",
        borderBottomWidth: 4,
        paddingTop: 8,
        paddingBottom: 4,
        fontSize: 32,
        fontWeight: "bold",
        outlineStyle: "none",
      }
    : {
        width: "fit-content",
        borderBottomWidth: 4,
        paddingTop: 8,
        paddingBottom: 4,
        fontSize: 32,
        fontWeight: "bold",
      },
});
