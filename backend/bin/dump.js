#!/usr/bin/env node
import { listKeys, getComponent } from "../src/db/index.js";

async function showList() {
  const list = await listKeys();
  console.log("Available components in DB:");
  console.log(list.map((s) => `- ${s}`).join("\n"));
}

(async () => {
  if (process.argv.length !== 3 && process.argv.length !== 2) {
    console.log("Syntax: dump <component-name>");
    process.exit(1);
  }

  if (process.argv.length === 2) {
    return showList();
  }

  const id = process.argv.pop();

  try {
    const source = await getComponent(id);
    console.log("source:", source.toString());
  } catch (error) {
    if (error.name === "NotFoundError") {
      console.log(`Can not find "${id}"`);
      await showList();
    } else {
      throw error;
    }
  }
})();
