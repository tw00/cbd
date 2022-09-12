import levelup from "levelup";
import leveldown from "rocksdb";
import getDirname from "../utils/getDirname.js";

const __dirname = getDirname(import.meta.url);
const db = levelup(leveldown(`${__dirname}/../../db`));

export default db;
