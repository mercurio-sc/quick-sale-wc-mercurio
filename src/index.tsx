import App from "./App";
import "./index.css";

import webComponentApp from "@mercurio-sc/web-component-app";

const WEB_COMPONENT_NAME = import.meta.env.VITE_WEB_COMPONENT_NAME;

window.customElements.get(WEB_COMPONENT_NAME) ||
  window.customElements.define(
    WEB_COMPONENT_NAME,
    webComponentApp(App, { styles: SHADOW_STYLE })
  );
