import { PropsWithChildren } from "react";
import { Slot, SlotProvider } from "./slot";
import { slotElement } from "./utils";

const ElementTypes = {
  Footer: Symbol("Composable.Footer"),
  Header: Symbol("Composable.Header"),
  Number: Symbol("Composable.Number"),
};

export function ComposableComponent(props: PropsWithChildren) {
  return (
    <SlotProvider slotChildren={props.children}>
      <Slot elementType={ElementTypes.Header}>
        {(element) => <div>Wrapped: {element}</div>}
      </Slot>
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

ComposableComponent.Header = slotElement(ElementTypes.Header, () => (
  <header>Header</header>
));

ComposableComponent.Footer = slotElement(ElementTypes.Footer, () => (
  <footer>Footer</footer>
));

ComposableComponent.Number = slotElement<{ num: number }>(ElementTypes.Number);

export function App() {
  return (
    <ComposableComponent>
      <ComposableComponent.Header />
      <ComposableComponent.Footer />
      <ComposableComponent.Number>
        {({ num }) => <div>Number: {num}</div>}
      </ComposableComponent.Number>
    </ComposableComponent>
  );
}
