import { ComponentType, JSX } from "react";
import { SlottableComponent } from "../types";

type ParameterizedProps<Params> = {
  children: (params: Params) => JSX.Element;
};

/**
 * Creates a slot element.
 * @param Component The component to create a slottable element from.
 * @param elementType The element type to use for the slottable element.
 * @returns The slot element.
 */
export function slottable<Params = unknown, Props = unknown>(
  Component: ComponentType<Props>,
  elementType: symbol,
): SlottableComponent<Props, Params> {
  return Object.assign(Component, {
    __brand: "SlotElement",
    __elementType: elementType,
  }) as SlottableComponent<Props, Params>;
}

/**
 * Creates a slot element with a parameterized children prop.
 * @param elementType The element type to use for the slottable element.
 * @returns The slot element.
 */
export function parametrizedSlottable<Params>(
  elementType: symbol,
): SlottableComponent<ParameterizedProps<Params>, Params> {
  const Component = ({ children, ...rest }: ParameterizedProps<Params>) =>
    children ? children((rest as { __params: Params }).__params) : null;

  return slottable<Params, ParameterizedProps<Params>>(
    Component,
    elementType,
  ) as SlottableComponent<ParameterizedProps<Params>, Params>;
}
