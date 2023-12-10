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
}>;

export const SlotProvider = ({ children, slotChildren }: SlotProviderProps) => {
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
      {children}
    </SlotContext.Provider>
  );
};
