import { ReactElement } from "react";
import { SlotElement } from "../types";

/**
 * A function that checks if a component is a slottable component.
 * @param element The component to check.
 * @returns True if the component is a slottable component, false otherwise.
 */
export function isSlottableElement<Props = object>(
  element: ReactElement<Props>,
): element is SlotElement<Props> {
  return (
    typeof element.type === "function" &&
    "__brand" in element.type &&
    element.type.__brand === "SlotElement" &&
    "__elementType" in element.type
  );
}
