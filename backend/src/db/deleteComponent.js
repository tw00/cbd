import db from "./db.js";

export default async function deleteComponent(name) {
  return await db.del(name);
}
