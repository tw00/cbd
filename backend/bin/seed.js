#!/usr/bin/env node
import { readdirSync, readFileSync } from "fs";
import { basename } from "path";
import { storeComponent } from "../src/db";
import getDirname from "../src/utils/getDirname.js";

const __dirname = getDirname(import.meta.url);
const examplePath = `${__dirname}/../examples`;

(async () => {
  const components = readdirSync(examplePath)
    .filter((filename) => filename.endsWith(".js"))
    .map((filename) => {
      const path = `${examplePath}/${filename}`;
      return {
        name: basename(filename, ".js"),
        filename,
        // meta: require(path).meta,
        content: readFileSync(path, "utf-8"),
      };
    });

  for await (const comp of components) {
    console.log(`Saving "${comp.name}"`);
    storeComponent(comp);
  }

  console.log("DONE");
})();
