import { SlotConditionFn, SlotElement } from "../types";
import { useSlot } from "./useSlot.tsx";
import React, { ComponentProps, ReactElement, ReactNode } from "react";

export type SlotProps<Params = never> = {
  elementType: symbol;
  condition?: SlotConditionFn;
  params?: Params;
  children?: (element: ReactElement) => ReactNode;
};

export function Slot<Params = never>(props: SlotProps<Params>) {
  const element = useSlot(props);
  if (!element) return null;
  const elementWithProps = React.cloneElement(element, {
    __params: props.params || {},
  } as ComponentProps<typeof element.type> & {
    __params: Params;
  }) as SlotElement<Params>;

  return props.children ? props.children(elementWithProps) : elementWithProps;
}
