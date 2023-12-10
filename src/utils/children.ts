import { SlotConditionFn, SlotElement } from "../types";

function getPredicate(elementType: symbol, condition?: SlotConditionFn) {
  return (element: SlotElement) => {
    if (element.type.__elementType === elementType) {
      if (condition) {
        return condition(element);
      }

      return true;
    }

    return false;
  };
}

/**
 * Finds the first matching element in an array of React elements.
 * @param elements The array of React elements to search.
 * @param elementType The type of element to search for.
 * @param condition An optional condition function to check if the element matches.
 * @returns The first matching element, or undefined if no matching element was found.
 */
export function findMatchingElements(
  elements: SlotElement[],
  elementType: symbol,
  condition?: SlotConditionFn,
) {
  return elements.filter(getPredicate(elementType, condition));
}

/**
 * Finds the first matching element in an array of React elements.
 * @param elements The array of React elements to search.
 * @param elementType The type of element to search for.
 * @param condition An optional condition function to check if the element matches.
 * @returns The first matching element, or undefined if no matching element was found.
 */
export function findFirstMatchingElement(
  elements: SlotElement[],
  elementType: symbol,
  condition?: SlotConditionFn,
) {
  return elements.find(getPredicate(elementType, condition));
}
