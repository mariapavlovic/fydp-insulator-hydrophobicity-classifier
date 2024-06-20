function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import React, { forwardRef, useContext } from 'react';
import { AccordionItemContext } from './Context';
import AnimatedHeight from './AnimatedHeight';
export const AccordionContent = StyledAccordionContent => /*#__PURE__*/forwardRef(({
  children,
  ...props
}, ref) => {
  const {
    regionProps,
    isExpanded
  } = useContext(AccordionItemContext);
  return /*#__PURE__*/React.createElement(AnimatedHeight, {
    hide: !isExpanded
  }, /*#__PURE__*/React.createElement(StyledAccordionContent, _extends({
    ref: ref
  }, props, regionProps), children));
});
//# sourceMappingURL=AccordionContent.js.map