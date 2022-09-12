import db from "./db.js";

async function getComponent(name) {
  return await db.get(name);
}

export default getComponent;
