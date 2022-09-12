import { fileURLToPath } from "url";
import { dirname } from "path";

// Call with:
// const __dirname = getDirname(import.meta.url)
export default function getDirname(metaUrl) {
  const __dirname = dirname(fileURLToPath(metaUrl));
  return __dirname;
}
