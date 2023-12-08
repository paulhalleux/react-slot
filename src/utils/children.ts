import { SlotConditionFn, SlotElement } from "../types";

/**
 * Finds the first matching element in an array of React elements.
 * @param elements The array of React elements to search.
 * @param elementType The type of element to search for.
 * @param condition An optional condition function to check if the element matches.
 * @returns The first matching element, or undefined if no matching element was found.
 */
export function findMatchingElement(
  elements: SlotElement[],
  elementType: symbol,
  condition?: SlotConditionFn,
) {
  return elements.find((element) => {
    if (element.type.__elementType === elementType) {
      if (condition) {
        return condition(element);
      }

      return true;
    }

    return false;
  });
}
