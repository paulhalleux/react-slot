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
export function slotElement<
  Params = unknown,
  Props = Params extends NonNullable<unknown>
    ? ParameterizedProps<Params>
    : NonNullable<unknown>,
>(
  elementType: symbol,
  Component:
    | ComponentType<Props>
    | ComponentType<ParameterizedProps<Params>> = ({
    children,
    ...rest
  }: ParameterizedProps<Params>) =>
    children ? children((rest as { __params: Params }).__params) : null,
): SlottableComponent<Props, Params> {
  return Object.assign(Component, {
    __brand: "SlotElement",
    __elementType: elementType,
  }) as SlottableComponent<Props, Params>;
}
