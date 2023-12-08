> [!IMPORTANT]
> This is a personal project, not intended to be published on npm.

# @paulhalleux/react-slot

This package provides a way to create composable components with slots.

## Usage

### Basic usage

```tsx
import { SlotProvider, Slot, slotElement } from "@paulhalleux/react-slot";
import { PropsWithChildren } from "react";

const ElementTypes = {
  Footer: Symbol("Footer"),
  Header: Symbol("Header"),
  Number: Symbol("Number"),
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

ComposableComponent.Header = slotElement(ElementTypes.Header, () => (
  <header>Header</header>
));

ComposableComponent.Footer = slotElement(ElementTypes.Footer, () => (
  <footer>Footer</footer>
));

ComposableComponent.Number = slotElement<{ num: number }>(ElementTypes.Number);
```

---

Component can be used like this:

```tsx
<ComposableComponent>
  <ComposableComponent.Header />
  <ComposableComponent.Footer />
  <ComposableComponent.Number>
    {({ num }) => <div>Number: {num}</div>}
  </ComposableComponent.Number>
</ComposableComponent>
```

Which will render:

```
Header
<hr />
Number: 0
Number: 1
Number: 2
Number: 3
Number: 4
<hr />
Footer
```