import { useContext, useMemo } from "react";
import { findMatchingElements } from "../utils/children.ts";
import { SlotListProps } from "../slot";
import { SlotContext } from "../slot/slot-context.tsx";

/**
 * This is the hook that is used by the SlotList component to find the matching elements.
 * @param props The props passed to the SlotList component.
 * @returns The matching elements.
 */
export function useSlotList<Props>(props: SlotListProps<Props>) {
  const { slotElements } = useContext(SlotContext);
  return useMemo(
    () =>
      findMatchingElements(slotElements, props.elementType, props.condition),
    [slotElements, props],
  );
}
