#!/usr/bin/env node --no-warnings

import esbuild from "esbuild";
import fs from "fs";
import { basename, extname } from "path";
import cbdClient from "../src/client/index.js";
import { endpoint } from "../src/config.js";

(async () => {
  if (process.argv.length !== 3) {
    console.log("Syntax: publish <component-path>");
    process.exit(1);
  }

  console.log("process", process.cwd());

  const filename = process.argv.pop();
  const name = basename(filename, extname(filename));
  const buildOutput = `build/components/${name}.js`;

  const { errors, warnings } = esbuild.buildSync({
    entryPoints: [filename],
    format: "esm",
    bundle: true,
    external: ["react", "react-dom"],
    target: ["chrome105"],
    outfile: buildOutput,
  });

  if (errors.length) {
    console.error(errors);
  }

  if (warnings.length) {
    console.error(warnings);
  }

  const content = fs.readFileSync(buildOutput).toString();
  const client = cbdClient(endpoint);

  console.log(`📤 Publishing "${name}"`);

  if (name && content) {
    const result = await client.publishComponent(name, content);
    console.log(result);
  } else {
    console.error("Can not read component.");
  }
})();
