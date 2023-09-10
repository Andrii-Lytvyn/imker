import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from "./redux/store.ts";
// import { Suspense } from "react";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <BrowserRouter basename="/imker">
      <App />
    </BrowserRouter>
  </Provider>
);
