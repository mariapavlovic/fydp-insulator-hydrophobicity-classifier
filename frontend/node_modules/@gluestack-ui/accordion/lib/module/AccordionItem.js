function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import React, { forwardRef, useContext, useMemo, useState } from 'react';
import { AccordionContext, AccordionItemContext } from './Context';
import { useAccordionItem } from '@react-native-aria/accordion';
export const AccordionItem = StyledAccordionItem => /*#__PURE__*/forwardRef(({
  children,
  ...props
}, ref) => {
  const [titleText, setTitleText] = useState('');
  const {
    state,
    isDisabledAccordion,
    selectedValues
  } = useContext(AccordionContext);
  const {
    isDisabled,
    value
  } = props;
  const {
    regionProps,
    buttonProps,
    isExpanded
  } = useAccordionItem(state, {
    value,
    isExpanded: selectedValues.includes(value),
    isDisabled: isDisabled !== undefined ? isDisabled : isDisabledAccordion
  });
  const context = useMemo(() => {
    return {
      isDisabled: isDisabled !== undefined ? isDisabled : isDisabledAccordion,
      isExpanded,
      value,
      buttonProps,
      regionProps,
      titleText,
      setTitleText
    };
  }, [isDisabled, isDisabledAccordion, isExpanded, value, buttonProps, regionProps, titleText]);
  return /*#__PURE__*/React.createElement(AccordionItemContext.Provider, {
    value: context
  }, /*#__PURE__*/React.createElement(StyledAccordionItem, _extends({
    ref: ref
  }, props), children));
});
//# sourceMappingURL=AccordionItem.js.map