import React, { ComponentType, ReactElement } from "react";

/**
 * A React component that can be used as a slot.
 */
export type SlottableComponent<Props, Params> = ComponentType<
  Props &
    (Params extends unknown ? object : { children: ComponentType<Params> })
> & {
  __brand: "SlotElement";
  __elementType: symbol;
};

/**
 * A React element that can be used as a slot.
 */
export type SlotElement<Props = unknown, Params = unknown> = ReactElement<
  Props,
  SlottableComponent<Props, Params>
>;

/**
 * A function that takes a React element and returns a boolean.
 * @param element The React element to check.
 * @returns True if the element matches the condition, false otherwise.
 */
export type SlotConditionFn = (element: React.ReactElement) => boolean;
