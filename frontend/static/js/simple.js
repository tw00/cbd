import { React, ReactDOM } from "./react.js";

import Image from "http://localhost:9300/?id=image";
import Text from "http://localhost:9300/?id=text";

window.React = React;
const h = React.createElement;

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(h("div", null, [h(Text), h(Image)]));
