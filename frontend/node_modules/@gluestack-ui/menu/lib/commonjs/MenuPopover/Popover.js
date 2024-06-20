"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Popover = void 0;
var _react = _interopRequireDefault(require("react"));
var _hooks = require("@gluestack-ui/hooks");
var _overlay = require("@gluestack-ui/overlay");
var _PopoverContext = require("./PopoverContext");
var _focus = require("@react-native-aria/focus");
var _PopoverContent = require("./PopoverContent");
var _MenuContext = require("../MenuContext");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const Popover = ({
  state,
  onOpen,
  trigger,
  children,
  defaultIsOpen = false,
  initialFocusRef,
  finalFocusRef,
  useRNModal,
  trapFocus = true,
  placement = 'bottom',
  shouldOverlapWithTrigger = false,
  crossOffset,
  offset,
  triggerRef,
  shouldFlip,
  focusScope = true,
  StyledBackdrop
}) => {
  const [isOpen, setIsOpen] = (0, _hooks.useControllableState)({
    value: state === null || state === void 0 ? void 0 : state.isOpen,
    defaultValue: defaultIsOpen,
    onChange: value => {
      value ? onOpen && onOpen() : state.close && state.close();
    }
  });
  const {
    onClose
  } = _react.default.useContext(_MenuContext.MenuContext);
  const [bodyMounted, setBodyMounted] = _react.default.useState(false);
  const [headerMounted, setHeaderMounted] = _react.default.useState(false);
  let idCounter = 0;
  function uniqueId(prefix = '') {
    const id = ++idCounter;
    return prefix + id;
  }
  const id = uniqueId();
  const popoverContentId = `${id}-content`;
  const headerId = `${popoverContentId}-header`;
  const bodyId = `${popoverContentId}-body`;
  const handleOpen = _react.default.useCallback(() => {
    setIsOpen(true);
  }, [setIsOpen]);
  const handleClose = _react.default.useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);
  const updatedTrigger = reference => {
    if (trigger) {
      return trigger({
        'ref': reference,
        'onPress': handleOpen,
        'aria-expanded': isOpen ? true : false,
        'aria-controls': isOpen ? popoverContentId : undefined,
        'aria-haspopup': true
      }, {
        open: isOpen
      });
    }
    return null;
  };
  const targetRefTemp = _react.default.useRef(null);
  const targetRef = triggerRef || targetRefTemp;
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, updatedTrigger(targetRef), /*#__PURE__*/_react.default.createElement(_overlay.Overlay, {
    isOpen: isOpen,
    onRequestClose: handleClose,
    isKeyboardDismissable: true,
    useRNModal: useRNModal
  }, /*#__PURE__*/_react.default.createElement(_PopoverContext.PopoverProvider, {
    value: {
      onClose: handleClose,
      targetRef,
      strategy: 'absolute',
      handleClose: handleClose,
      initialFocusRef,
      finalFocusRef,
      popoverContentId,
      bodyId,
      headerId,
      headerMounted,
      bodyMounted,
      setBodyMounted,
      setHeaderMounted,
      isOpen,
      placement,
      shouldOverlapWithTrigger,
      crossOffset,
      offset,
      shouldFlip
    }
  }, /*#__PURE__*/_react.default.createElement(StyledBackdrop, {
    onPress: onClose,
    tabIndex: -1
    // for ios
    ,
    accessibilityElementsHidden: true,
    importantForAccessibility: "no-hide-descendants",
    "aria-hidden": true
  }), /*#__PURE__*/_react.default.createElement(FocusScopeComponent, {
    trapFocus: trapFocus,
    focusScope: focusScope
  }, /*#__PURE__*/_react.default.createElement(_PopoverContent.PopoverContent, null, children)))));
};
exports.Popover = Popover;
const FocusScopeComponent = ({
  trapFocus,
  focusScope,
  children
}) => {
  if (focusScope) return /*#__PURE__*/_react.default.createElement(_focus.FocusScope, {
    contain: trapFocus,
    restoreFocus: true,
    autoFocus: true
  }, children);
  return children;
};
//# sourceMappingURL=Popover.js.map