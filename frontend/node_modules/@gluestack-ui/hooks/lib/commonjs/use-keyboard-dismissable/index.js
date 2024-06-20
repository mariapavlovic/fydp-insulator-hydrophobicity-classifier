"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.keyboardDismissHandlerManager = void 0;
exports.useBackHandler = useBackHandler;
exports.useKeyboardDismissable = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
let keyboardDismissHandlers = [];
const keyboardDismissHandlerManager = exports.keyboardDismissHandlerManager = {
  push: handler => {
    keyboardDismissHandlers.push(handler);
    return () => {
      keyboardDismissHandlers = keyboardDismissHandlers.filter(h => h !== handler);
    };
  },
  length: () => keyboardDismissHandlers.length,
  pop: () => {
    return keyboardDismissHandlers.pop();
  }
};

/**
 * Handles attaching callback for Escape key listener on web and Back button listener on Android
 */
const useKeyboardDismissable = ({
  enabled,
  callback
}) => {
  _react.default.useEffect(() => {
    let cleanupFn = () => {};
    if (enabled) {
      cleanupFn = keyboardDismissHandlerManager.push(callback);
    } else {
      cleanupFn();
    }
    return () => {
      cleanupFn();
    };
  }, [enabled, callback]);
  useBackHandler({
    enabled,
    callback
  });
};
exports.useKeyboardDismissable = useKeyboardDismissable;
function useBackHandler({
  enabled,
  callback
}) {
  (0, _react.useEffect)(() => {
    let backHandler = () => {
      callback();
      return true;
    };
    if (enabled) {
      _reactNative.BackHandler.addEventListener('hardwareBackPress', backHandler);
    } else {
      _reactNative.BackHandler.removeEventListener('hardwareBackPress', backHandler);
    }
    return () => _reactNative.BackHandler.removeEventListener('hardwareBackPress', backHandler);
  }, [enabled, callback]);
}
//# sourceMappingURL=index.js.map