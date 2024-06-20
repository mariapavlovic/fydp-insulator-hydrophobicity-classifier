function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import React, { forwardRef, useMemo } from 'react';
import { AccordionContext } from './Context';
import { useAccordion } from '@react-native-aria/accordion';
import { useControlledState } from '@react-stately/utils';
export const Accordion = StyledAccordion => /*#__PURE__*/forwardRef(({
  type = 'single',
  isCollapsible = true,
  isDisabled = false,
  value,
  defaultValue = [],
  onValueChange,
  children,
  ...props
}, ref) => {
  const [selectedValues, setSelectedValues] = useControlledState(value, defaultValue, incomingValue => {
    onValueChange && onValueChange(incomingValue);
  });
  const {
    state
  } = useAccordion({
    type,
    isCollapsible,
    selectedValues,
    setSelectedValues
  });
  const contextValue = useMemo(() => {
    return {
      state,
      isDisabledAccordion: isDisabled,
      selectedValues
    };
  }, [state, isDisabled, selectedValues]);
  return /*#__PURE__*/React.createElement(AccordionContext.Provider, {
    value: contextValue
  }, /*#__PURE__*/React.createElement(StyledAccordion, _extends({
    ref: ref
  }, props), children));
});
//# sourceMappingURL=Accordion.js.map