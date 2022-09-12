#!/usr/bin/env node
import { deleteComponent } from "../src/db/index.js";

(async () => {
  if (process.argv.length !== 3) {
    console.log("Syntax: delete <component-name>");
    process.exit(1);
  }
  const id = process.argv.pop();

  try {
    await deleteComponent(id);
    console.log("Deleted:", id);
  } catch (error) {
    throw error;
  }
})();
