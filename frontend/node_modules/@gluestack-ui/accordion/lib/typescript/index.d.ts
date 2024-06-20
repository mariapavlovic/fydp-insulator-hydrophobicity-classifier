import type React from 'react';
import { IAccordionComponentType } from './types';
export declare function createAccordion<AccordionProps, ItemProps, HeaderProps, TriggerProps, ContentProps, IconProps, TitleTextProps, ContentTextProps>({ Root, Item, Header, Trigger, Content, Icon, TitleText, ContentText, }: {
    Root: React.ComponentType<AccordionProps>;
    Item: React.ComponentType<ItemProps>;
    Header: React.ComponentType<HeaderProps>;
    Trigger: React.ComponentType<TriggerProps>;
    Content: React.ComponentType<ContentProps>;
    Icon: React.ComponentType<IconProps>;
    TitleText: React.ComponentType<TitleTextProps>;
    ContentText: React.ComponentType<ContentTextProps>;
}): IAccordionComponentType<AccordionProps, ItemProps, HeaderProps, TriggerProps, ContentProps, IconProps, TitleTextProps, ContentTextProps>;
//# sourceMappingURL=index.d.ts.map