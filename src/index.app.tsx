import React from "react";
import ReactDOM from "react-dom/client";
import { ComposableComponent } from "./examples/ComposableComponent.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ComposableComponent>
      <ComposableComponent.Header />
      <ComposableComponent.Footer />
      <ComposableComponent.Number>
        {({ num }) => <div>Number: {num}</div>}
      </ComposableComponent.Number>
    </ComposableComponent>
  </React.StrictMode>,
);
