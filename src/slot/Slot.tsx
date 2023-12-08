import { SlotConditionFn } from "../types";
import { useSlot } from "./useSlot.tsx";
import React, { ComponentProps } from "react";

export type SlotProps<Params = never> = {
  elementType: symbol;
  condition?: SlotConditionFn;
  params?: Params;
};

export function Slot<Params = never>(props: SlotProps<Params>) {
  const element = useSlot(props);
  if (!element) return null;
  return React.cloneElement(element, {
    __params: props.params || {},
  } as ComponentProps<typeof element.type> & { __params: Params });
}
