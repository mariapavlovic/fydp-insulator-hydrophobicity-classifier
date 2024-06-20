import { Accordion as AccordionMain } from './Accordion';
import { AccordionTitleText } from './AccordionTitleText';
import { AccordionContentText } from './AccordionContentText';
import { AccordionItem } from './AccordionItem';
import { AccordionTrigger } from './AccordionTrigger';
import { AccordionContent } from './AccordionContent';
import { AccordionIcon } from './AccordionIcon';
import { AccordionHeader } from './AccordionHeader';
export function createAccordion({
  Root,
  Item,
  Header,
  Trigger,
  Content,
  Icon,
  TitleText,
  ContentText
}) {
  const Accordion = AccordionMain(Root);
  Accordion.Item = AccordionItem(Item);
  Accordion.Header = AccordionHeader(Header);
  Accordion.Trigger = AccordionTrigger(Trigger);
  Accordion.Content = AccordionContent(Content);
  Accordion.Icon = AccordionIcon(Icon);
  Accordion.TitleText = AccordionTitleText(TitleText);
  Accordion.ContentText = AccordionContentText(ContentText);
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