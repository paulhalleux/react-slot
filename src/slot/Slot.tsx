import React, {
  ComponentProps,
  PropsWithChildren,
  ReactElement,
  ReactNode,
  useContext,
  useMemo,
} from "react";

import { SlotConditionFn, SlotElement } from "../types";
import { SlotContext } from "./slot-context.tsx";
import { findFirstMatchingElement, findMatchingElements } from "../utils";
import { useSlotExist } from "./useSlotExist.tsx";

// ------------ Slot ------------

type SlotProps<Params = never> = {
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

// ------------ Slot.List ------------

type SlotListProps = {
  elementType: symbol;
  condition?: SlotConditionFn;
} & (
  | {
      single: true;
      children?: (
        element: ReactElement,
        index: number,
        elements: ReactElement[],
      ) => ReactNode;
    }
  | {
      single?: never;
      children?: (elements: ReactElement[]) => ReactNode;
    }
);

function SlotList(props: SlotListProps) {
  const { slotElements } = useContext(SlotContext);
  const elements = useMemo(
    () =>
      findMatchingElements(slotElements, props.elementType, props.condition),
    [slotElements, props],
  );

  const { children, single } = props;
  if (!children) return <React.Fragment />;
  if (single === true)
    return (
      <>
        {elements.map((element, index) => children(element, index, elements))}
      </>
    );
  return <>{children(elements)}</>;
}

Slot.List = SlotList;

// ------------ Slot.If ------------

type SlotExistProps = PropsWithChildren<{
  elementType: symbol;
  condition?: SlotConditionFn;
}>;

function SlotExist(props: SlotExistProps) {
  const exist = useSlotExist(props);
  if (!exist) return <React.Fragment />;
  return <>{props.children}</>;
}

Slot.If = SlotExist;
