> [!IMPORTANT]
> This is a personal project, not intended to be published on npm.

# @paulhalleux/react-slot

[![Build](https://github.com/paulhalleux/react-slot/actions/workflows/build.yml/badge.svg)](https://github.com/paulhalleux/react-slot/actions/workflows/build.yml)

This package provides a way to create composable components with slots.

## Summary

- [Components](#components)
  - [SlotProvider](#slotprovider)
  - [Slot](#slot)
  - [Slot.If](#slotif)
  - [Slot.List](#slotlist)
- [Usage](#usage)
  - [Basic usage](#basic-usage)
- [Examples of usage](#examples-of-usage)

## Components

### SlotProvider

The `SlotProvider` component is used to provide the children to the slots.

```tsx
<SlotProvider slotChildren={props.children}>
  {/* ... */}
</SlotProvider>
```

### Slot

The `Slot` component is used to render the matching element of the slot.

```tsx
<Slot elementType={ElementTypes.Header} />
// --> <header>Header</header>
```

### Slot.If

The `Slot.If` component is used to render the children if an element of the slot matches the condition.

```tsx
<Slot.If elementType={ElementTypes.Header}>
  <div>Header</div>
</Slot.If>
// --> <div>Header</div>
```

### Slot.List

The `Slot.List` component is used to render each element matching the condition.

```tsx
<Slot.List elementType={ElementTypes.MenuItem}>
  {(element, index) => <li key={index}>{element}</li>}
</Slot.List>
// --> <>
//       <li>Item 1</li>
//       <li>Item 2</li>
//       <li>Item 3</li>
//     </>
```

## Usage

### Basic usage

```tsx
import { SlotProvider, Slot, SlotExist, slotElement } from "@paulhalleux/react-slot";
import { PropsWithChildren } from "react";

const ElementTypes = {
  Footer: Symbol("Footer"),
  Header: Symbol("Header"),
  Number: Symbol("Number"),
};

export function ComposableComponent(props: PropsWithChildren) {
  return (
    <SlotProvider slotChildren={props.children}>
      <Slot elementType={ElementTypes.Header}>
        {(element) => <div>Wrapped: {element}</div>}
      </Slot>
      <Slot.If elementType={ElementTypes.Number}>
        <hr />
        {Array.from({ length: 5 }).map((_, i) => (
          <Slot
            elementType={ElementTypes.Number}
            params={{ num: i }}
            key={`n_${i}`}
          />
        ))}
        <hr />
      </Slot.If>
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

```html
<header>Header</header>
<hr />
<div>Number: 0</div>
<div>Number: 1</div>
<div>Number: 2</div>
<div>Number: 3</div>
<div>Number: 4</div>
<hr />
<footer>Footer</footer>
```

## Examples of usage

### Placing elements in the same order

An example of usage would be to ensure that elements are always in the same order.

```tsx
function ModalFooter(props: PropsWithChildren) {
  return (
    <SlotProvider slotChildren={props.children} as="footer">
      <Slot elementType={ElementTypes.ModalButton} condition={(e) => e.props.type === "cancel"} />
      <Slot elementType={ElementTypes.ModalButton} condition={(e) => e.props.type === "submit"} />
    </SlotProvider>
  );
}
```


```tsx
<Modal.Footer>
  <Modal.Button type="submit">Submit</Modal.Button>
  <Modal.Button type="cancel">Cancel</Modal.Button>
</Modal.Footer>
```

Would render:

```tsx
<footer>
  <button>Cancel</button>
  <button>Submit</button>
</footer>
```