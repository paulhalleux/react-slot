import React, {
  ComponentProps,
  ReactElement,
  ReactNode,
  useContext,
  useMemo,
} from "react";

import { SlotList } from "./SlotList.tsx";
import { SlotExist } from "./SlotExist.tsx";

import { SlotConditionFn, SlotElement } from "../types";
import { SlotContext } from "./slot-context.tsx";
import { findFirstMatchingElement } from "../utils";

export type SlotProps<Params = never> = {
  elementType: symbol;
  condition?: SlotConditionFn;
  params?: Params;
  children?: (element: ReactElement) => ReactNode;
};

export function Slot<Params = never>(props: SlotProps<Params>) {
  const { slotElements } = useContext(SlotContext);
  const element = useMemo(() => {
    const element = findFirstMatchingElement(
      slotElements,
      props.elementType,
      props.condition,
    );

    return element || null;
  }, [slotElements, props]);

  if (!element) return <React.Fragment />;

  const elementWithProps = React.cloneElement(element, {
    __params: props.params || {},
  } as ComponentProps<typeof element.type> & {
    __params: Params;
  }) as SlotElement<Params>;

  return props.children ? props.children(elementWithProps) : elementWithProps;
}

Slot.List = SlotList;
Slot.Exist = SlotExist;
