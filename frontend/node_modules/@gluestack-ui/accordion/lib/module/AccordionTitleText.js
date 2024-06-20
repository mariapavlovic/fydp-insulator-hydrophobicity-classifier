function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import React, { forwardRef, useContext, useEffect } from 'react';
import { AccordionItemContext } from './Context';
export const AccordionTitleText = StyledAccordionTitleText => /*#__PURE__*/forwardRef(({
  children,
  ...props
}, ref) => {
  const {
    setTitleText
  } = useContext(AccordionItemContext);
  useEffect(() => {
    if (typeof children === 'string') {
      setTitleText(children);
    }
  }, [children, setTitleText]);
  return /*#__PURE__*/React.createElement(StyledAccordionTitleText, _extends({
    ref: ref
  }, props), children);
});
//# sourceMappingURL=AccordionTitleText.js.map