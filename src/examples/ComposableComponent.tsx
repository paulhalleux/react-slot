import { SlotProvider } from "../slot/slot-context.tsx";
import { PropsWithChildren } from "react";
import { Slot } from "../slot/Slot.tsx";
import { createElementType } from "../utils/create-element-type.ts";
import { slottable, parametrizedSlottable } from "../utils/slottable.tsx";

const ElementTypes = {
  Footer: createElementType("Footer"),
  Header: createElementType("Header"),
  Number: createElementType("Number"),
};

export function ComposableComponent(props: PropsWithChildren) {
  return (
    <SlotProvider slotChildren={props.children}>
      <Slot elementType={ElementTypes.Header} />
      <hr />
      {Array.from({ length: 5 }).map((_, i) => (
        <Slot
          elementType={ElementTypes.Number}
          params={{ num: i }}
          key={`n_${i}`}
        />
      ))}
      <hr />
      <Slot elementType={ElementTypes.Footer} />
    </SlotProvider>
  );
}

ComposableComponent.Header = slottable(
  () => <header>Header</header>,
  ElementTypes.Header,
);

ComposableComponent.Footer = slottable(
  () => <footer>Footer</footer>,
  ElementTypes.Footer,
);

ComposableComponent.Number = parametrizedSlottable<{ num: number }>(
  ElementTypes.Number,
);
