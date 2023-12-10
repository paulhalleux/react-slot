import React, { PropsWithChildren } from "react";

import { useSlotExist } from "./useSlotExist.tsx";

import { SlotConditionFn } from "../types";

export type SlotExistProps = PropsWithChildren<{
  elementType: symbol;
  condition?: SlotConditionFn;
}>;

export function SlotExist(props: SlotExistProps) {
  const exist = useSlotExist(props);
  if (!exist) return <React.Fragment />;
  return <>{props.children}</>;
}
