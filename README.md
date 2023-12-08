> [!IMPORTANT]
> This is a personal project, not intended to be published on npm.

# @paulhalleux/react-slot

This package provides a way to create composable components with slots.

## Usage

### Basic usage

```tsx
import { SlotProvider, Slot, createElementType, slottable, parametrizedSlottable } from "@paulhalleux/react-slot";
import { PropsWithChildren } from "react";

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

// This component will render with the number passed in props
ComposableComponent.Number = parametrizedSlottable<{ num: number }>(
  ElementTypes.Number,
);

```

---

Component can be used like this:

```tsx
<ComposableComponent>
  <ComposableComponent.Footer />
  <ComposableComponent.Header />
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