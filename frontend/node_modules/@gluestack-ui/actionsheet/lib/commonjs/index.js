"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createActionsheet = createActionsheet;
var _Actionsheet = require("./Actionsheet");
var _ActionsheetContent = _interopRequireDefault(require("./ActionsheetContent"));
var _ActionsheetItem = require("./ActionsheetItem");
var _ActionsheetBackdrop = _interopRequireDefault(require("./ActionsheetBackdrop"));
var _ActionsheetDragIndicatorWrapper = require("./ActionsheetDragIndicatorWrapper");
var _ActionsheetDragIndicator = _interopRequireDefault(require("./ActionsheetDragIndicator"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
// import { ActionsheetItemText } from './ActionsheetItemText';

// import { ActionsheetScrollView } from './ActionsheetScrollView';
// import { ActionsheetVirtualizedList } from './ActionsheetVirtualizedList';

// import { ActionsheetFlatList } from './ActionsheetFlatList';
// import { ActionsheetSectionList } from './ActionsheetSectionList';
// import { ActionsheetSectionHeaderText } from './ActionsheetSectionHeaderText';
// import { ActionsheetIcon } from './ActionsheetIcon';

function createActionsheet({
  Root,
  Backdrop,
  Item,
  ItemText,
  DragIndicator,
  IndicatorWrapper,
  Content,
  ScrollView,
  VirtualizedList,
  FlatList,
  SectionList,
  SectionHeaderText,
  Icon,
  AnimatePresence
}) {
  const Actionsheet = (0, _Actionsheet.Actionsheet)(Root);
  Actionsheet.Backdrop = (0, _ActionsheetBackdrop.default)(Backdrop, AnimatePresence);
  Actionsheet.Content = (0, _ActionsheetContent.default)(Content, AnimatePresence);
  Actionsheet.DragIndicator = (0, _ActionsheetDragIndicator.default)(DragIndicator);
  Actionsheet.DragIndicatorWrapper = (0, _ActionsheetDragIndicatorWrapper.ActionsheetDragIndicatorWrapper)(IndicatorWrapper);
  Actionsheet.Item = (0, _ActionsheetItem.ActionsheetItem)(Item);
  Actionsheet.ItemText = ItemText;
  Actionsheet.Icon = Icon;
  Actionsheet.ScrollView = ScrollView;
  Actionsheet.VirtualizedList = VirtualizedList;
  Actionsheet.FlatList = FlatList;
  Actionsheet.SectionList = SectionList;
  Actionsheet.SectionHeaderText = SectionHeaderText;
  return Actionsheet;
}
//# sourceMappingURL=index.js.map