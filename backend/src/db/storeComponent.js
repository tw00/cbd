import db from "./db.js";

export default async function storeComponent(component) {
  await db.put(component.name, component.content);
}
