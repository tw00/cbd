import { React, ReactDOM } from "./react.js";
import pageData from "/data/page.js";

const h = React.createElement;
// const endpoint = "http://localhost:9300/";
const endpoint = "/backend/";

function hash(obj) {
  return JSON.stringify(obj)
    .split("")
    .reduce((a, b) => {
      a = (a << 5) - a + b.charCodeAt(0);
      return a & a;
    }, 0)
    .toString(36);
}

async function packageSelector() {
  const page = [];
  for (const { type, ...pkg } of pageData.packages) {
    const { default: Component } = await import(`${endpoint}?id=${type}`);
    const key = `${type}${hash(pkg)}`;
    page.push(h(Component, { key, ...pkg }, []));
  }
  return page;
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(h(React.Fragment, null, await packageSelector(pageData)));

window.React = React;
