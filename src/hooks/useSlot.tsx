import { findFirstMatchingElement } from "../utils/children.ts";
import { useContext, useMemo } from "react";
import { SlotProps } from "../slot";
import { SlotContext } from "../slot/slot-context.tsx";

/**
 * This is the hook that is used by the Slot component to find the matching element.
 * @param props The props passed to the Slot component.
 * @returns The matching element, or null if no matching element was found.
 */
export function useSlot<Params>(props: SlotProps<Params>) {
  const { slotElements } = useContext(SlotContext);
  return useMemo(() => {
    const element = findFirstMatchingElement(
      slotElements,
      props.elementType,
      props.condition,
    );

    return element || null;
  }, [slotElements, props]);
}
