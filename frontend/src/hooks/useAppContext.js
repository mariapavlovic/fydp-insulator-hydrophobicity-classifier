import { useState } from "react";
import { ROUTES } from "../common/routes";
import { IS_WEB } from "../common/utils";

const VALID_ROUTES = Object.keys(ROUTES).map((k) => ROUTES[k]);
export const useAppContext = () => {
  const [activeView, updateActiveView] = useState(null);
  const [activeUploadKey, setActiveUploadKey] = useState(null);

  const openUpload = (key) => {
    setActiveUploadKey(key);
    setActiveView(ROUTES.CLASSIFICATION);
  };

      
  const setActiveView = (v) => {
    let route = v;
    if (!VALID_ROUTES.includes(v)) {
      route = ROUTES.HOME;
    }
    if(IS_WEB) {
      const {origin} = new URL(document.location);
      const path = `${origin}/${route}`;
      history.pushState({urlPath:path},"",`/${route}`)
    }
    updateActiveView(route);
  };
  return {
    activeView,
    setActiveView,
    activeUploadKey,
    setActiveUploadKey,
    openUpload,
  };
};
