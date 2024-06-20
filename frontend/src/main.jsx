import { useContext, useEffect } from "react";
import { NavigationBar, NavigationSidebar } from "./navigation/navigationBar";
import {  View } from "react-native";
import { UploadHistoryView } from "./views/uploadHistory";
import { UploadImageView } from "./views/uploadImage";
import { IS_WEB } from "./common/utils";
import { AppContext } from "./appContext";
import { ClassificationPageView } from "./views/classificationPage";
import { ROUTES } from "./common/routes";
import { makeStyles } from '@rneui/themed';
import { HomePageView } from "./views/homePage";
import { CameraPageView } from "./views/cameraPage";
import { GuidePageView } from "./views/guidePage";
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const MOBILEVIEWS = [
  { icon: "home", path: ROUTES.HOME, name: "Home" },
  { icon: "upload", path: ROUTES.UPLOAD, name: "Upload Photo" },
  { icon: "camera", path: ROUTES.CAMERA, name: "Camera" },
  { icon: "folder-open", path: ROUTES.HISTORY, name: "History" }
];

const WEBVIEWS = [
  { icon: "home", path: ROUTES.HOME, name: "Home" },
  { icon: "upload", path: ROUTES.UPLOAD, name: "Upload Photo" },
  { icon: "folder-open", path: ROUTES.HISTORY, name: "History" }
];

const useStyles = makeStyles((theme) => ({
  mobileWrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    height: "100%",
    flexDirection: 'column'
  },
  webWrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    height: "100%",
    display: "grid",
    gridTemplateColumns: "auto 1fr"
  },
  mobileContainer: {
    paddingTop: "16%",
    maxHeight: "90%",
    width: "100%",
    overflow: "hidden",
    flexGrow: 1,
    backgroundColor: "#e3e7db",
  },
  webContainer: {
    backgroundColor: "#e3e7db",
    overflow: "hidden",
    flexGrow: "none",
    height: "100%",
    width: '100%'
  },
}));


const Content = ({view}) => (
  <>
    {view === ROUTES.HISTORY && <UploadHistoryView />}
    {view === ROUTES.UPLOAD && <UploadImageView />}
    {view === ROUTES.CLASSIFICATION && <ClassificationPageView />}
    {view === ROUTES.CAMERA && <CameraPageView />}
    {view === ROUTES.HOME && <HomePageView />}
    {view === ROUTES.GUIDE && <GuidePageView />}

  </>
);

export const Container = () => {
  const styles = useStyles();
  const {activeView, setActiveView} = useContext(AppContext);

  useEffect(() => {if(!activeView) setActiveView(ROUTES.HOME)})
  const search = IS_WEB ? new URL(document.location) : null;

  useEffect(() => {
    if(IS_WEB) {
      const { pathname } = search;
      console.log({search});
      const paths = pathname.split("/");
      if(paths.length < 1) return;
      console.log(paths);
      if(paths[1].length > 0  && paths[1] != activeView) {
        setActiveView(paths[1]);
      };
    }
  }, []);

  if(IS_WEB) {
    return (
      <View style={styles.webWrapper}>
        <NavigationSidebar
          activeView={activeView}
          setActiveView={setActiveView}
          views={WEBVIEWS}
        />
        <View style={styles.webContainer}>
          <Content view={activeView}/>
        </View>
      </View>
    )
  }
  return (
    <View style={styles.mobileWrapper}>
      <View style={styles.mobileContainer}>
        <Content view={activeView}/>
      </View>
      <NavigationBar
        activeView={activeView}
        setActiveView={setActiveView}
        views={MOBILEVIEWS}
      />
    </View>
  );
};
