import Koa from "koa";
import cors from "@koa/cors";
import koaBody from "koa-body";
import componentRegistry from "./registry.js";
import perf from "./perf.js";

const app = new Koa();

app.use(cors());
app.use(koaBody());
app.use(perf());
app.use(componentRegistry());

app.listen(9300);
