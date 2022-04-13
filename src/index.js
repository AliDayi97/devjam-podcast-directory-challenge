import React from "react";
import { createRoot } from "react-dom/client";
import { Provider as ReduxProvider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import PodcastApiProvider from "./contexts/PodcastApiProvider";
import "./index.css";
import store from "./redux/store";
const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <BrowserRouter>
    <ReduxProvider store={store}>
      <PodcastApiProvider>
        <App />
      </PodcastApiProvider>
    </ReduxProvider>
  </BrowserRouter>
);
