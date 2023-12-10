import { useContext, useMemo } from "react";

import { SlotContext } from "./slot-context.tsx";
import { SlotExistProps } from "./SlotExist.tsx";

import { findFirstMatchingElement } from "../utils";

/**
 * This is the hook that is used by the SlotExist component to find if there is a matching element.
 * @param props The props passed to the SlotExist component.
 * @returns True if there is a matching element, false otherwise.
 */
export function useSlotExist(props: Omit<SlotExistProps, "children">) {
  const { slotElements } = useContext(SlotContext);
  return useMemo(
    () =>
      !!findFirstMatchingElement(
        slotElements,
        props.elementType,
        props.condition,
      ),
    [slotElements, props],
  );
}
