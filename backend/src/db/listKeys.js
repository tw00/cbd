import db from "./db.js";

export default async function listKeys() {
  return new Promise((resolve, reject) => {
    const list = [];
    db.createReadStream()
      .on("data", (data) => {
        list.push(data.key.toString());
      })
      .on("error", reject)
      .on("end", () => {
        resolve(list);
      });
  });
}
