import { ReactElement, ReactNode, useContext, useMemo } from "react";
import { SlotConditionFn, SlotElement } from "../types";
import { SlotContext } from "./slot-context.tsx";
import { findMatchingElements } from "../utils";

export type SlotListProps<Props> = {
  elementType: symbol;
  condition?: SlotConditionFn;
  children?: (elements: ReactElement<Props>[]) => ReactNode;
};

export function SlotList<Props>(props: SlotListProps<Props>) {
  const { slotElements } = useContext(SlotContext);
  const elements = useMemo(
    () =>
      findMatchingElements(slotElements, props.elementType, props.condition),
    [slotElements, props],
  ) as SlotElement<Props>[];

  const { children } = props;
  return <>{children ? children(elements) : elements}</>;
}
