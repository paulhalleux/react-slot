import { ReactElement, ReactNode } from "react";
import { SlotConditionFn, SlotElement } from "../types";
import { useSlotList } from "../hooks/useSlotList.tsx";

export type SlotListProps<Props> = {
  elementType: symbol;
  condition?: SlotConditionFn;
  children?: (element: ReactElement<Props>[]) => ReactNode;
};

export function SlotList<Props>(props: SlotListProps<Props>) {
  const elements = useSlotList(props) as SlotElement<Props>[];
  const { children } = props;
  return <>{children ? children(elements) : elements}</>;
}
