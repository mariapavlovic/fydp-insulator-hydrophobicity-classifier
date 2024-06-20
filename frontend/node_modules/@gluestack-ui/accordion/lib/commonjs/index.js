"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createAccordion = createAccordion;
var _Accordion = require("./Accordion");
var _AccordionTitleText = require("./AccordionTitleText");
var _AccordionContentText = require("./AccordionContentText");
var _AccordionItem = require("./AccordionItem");
var _AccordionTrigger = require("./AccordionTrigger");
var _AccordionContent = require("./AccordionContent");
var _AccordionIcon = require("./AccordionIcon");
var _AccordionHeader = require("./AccordionHeader");
function createAccordion({
  Root,
  Item,
  Header,
  Trigger,
  Content,
  Icon,
  TitleText,
  ContentText
}) {
  const Accordion = (0, _Accordion.Accordion)(Root);
  Accordion.Item = (0, _AccordionItem.AccordionItem)(Item);
  Accordion.Header = (0, _AccordionHeader.AccordionHeader)(Header);
  Accordion.Trigger = (0, _AccordionTrigger.AccordionTrigger)(Trigger);
  Accordion.Content = (0, _AccordionContent.AccordionContent)(Content);
  Accordion.Icon = (0, _AccordionIcon.AccordionIcon)(Icon);
  Accordion.TitleText = (0, _AccordionTitleText.AccordionTitleText)(TitleText);
  Accordion.ContentText = (0, _AccordionContentText.AccordionContentText)(ContentText);
  Accordion.displayName = 'Accordion';
  Accordion.Item.displayName = 'Accordion.Item';
  Accordion.Header.displayName = 'Accordion.Header';
  Accordion.Trigger.displayName = 'Accordion.Trigger';
  Accordion.Content.displayName = 'Accordion.Content';
  Accordion.Icon.displayName = 'Accordion.Icon';
  Accordion.TitleText.displayName = 'Accordion.TtitleText';
  return Accordion;
}
//# sourceMappingURL=index.js.map