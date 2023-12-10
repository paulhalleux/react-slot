import React, {
  createContext,
  PropsWithChildren,
  ReactNode,
  useMemo,
} from "react";
import { isSlottableElement } from "../utils";
import { SlotElement } from "../types";

export type SlotContextType = {
  slotElements: SlotElement[];
};

export const SlotContext = createContext<SlotContextType>({
  slotElements: [],
});

export type SlotProviderProps = PropsWithChildren<{
  slotChildren: ReactNode;
  as?: React.ElementType;
  className?: string;
  style?: React.CSSProperties;
}>;

export const SlotProvider = ({
  children,
  slotChildren,
  as: Wrapper = React.Fragment,
  ...props
}: SlotProviderProps) => {
  const childElements = useMemo(
    () =>
      React.Children.toArray(slotChildren)
        .filter(React.isValidElement)
        .filter(isSlottableElement),
    [slotChildren],
  );

  return (
    <SlotContext.Provider
      value={{
        slotElements: childElements,
      }}
    >
      <Wrapper {...props}>{children}</Wrapper>
    </SlotContext.Provider>
  );
};
