import { renderToString } from "react-dom/server";
import AppRoot from "./AppRoot.jsx";

export function render() {
  return renderToString(<AppRoot />);
}
