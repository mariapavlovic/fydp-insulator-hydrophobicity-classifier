"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useKeyboardBottomInset = void 0;
var React = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const useKeyboardBottomInset = () => {
  const [bottom, setBottom] = React.useState(0);
  const subscriptions = React.useRef([]);
  React.useEffect(() => {
    function onKeyboardChange(e) {
      if (e.startCoordinates && e.endCoordinates.screenY <= e.startCoordinates.screenY) setBottom(e.endCoordinates.height / 2);else setBottom(0);
    }
    if (_reactNative.Platform.OS === 'ios') {
      subscriptions.current = [_reactNative.Keyboard.addListener('keyboardWillChangeFrame', onKeyboardChange)];
    } else {
      subscriptions.current = [_reactNative.Keyboard.addListener('keyboardDidHide', onKeyboardChange), _reactNative.Keyboard.addListener('keyboardDidShow', onKeyboardChange)];
    }
    return () => {
      subscriptions.current.forEach(subscription => {
        subscription.remove();
      });
    };
  }, [setBottom, subscriptions]);
  return bottom;
};
exports.useKeyboardBottomInset = useKeyboardBottomInset;
//# sourceMappingURL=index.js.map