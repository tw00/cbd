import { getComponent, storeComponent } from "./db/index.js";

async function handleGetComponent(ctx) {
  const { id } = ctx.request.query;
  ctx.set("Content-Type", "application/javascript; charset=utf-8");

  if (!id) {
    ctx.body = "/* 404: missing id */";
    ctx.response.status = 404;
    return;
  }

  try {
    const source = await getComponent(id);
    ctx.body = source.toString();
  } catch (error) {
    ctx.body = "/* 404: not found */";
    ctx.response.status = 404;
    return;
  }
}
async function handlePostComponent(ctx) {
  const { id } = ctx.request.query;
  ctx.set("Content-Type", "application/json");
  if (!id || !ctx.request.body) {
    return ctx.throw(404);
  }

  try {
    console.log(`- Storing "${id}" with content:\n${ctx.request.body}`);
    await storeComponent({ name: id, content: ctx.request.body });
    ctx.body = "/* ok */";
  } catch (error) {
    console.error("Failed with:", error);
    return ctx.throw(500);
  }
}

export default function componentRegistryFactory() {
  return async (ctx) => {
    const { method } = ctx.request;

    if (method === "GET") {
      return handleGetComponent(ctx);
    } else if (method === "POST") {
      return handlePostComponent(ctx);
    }
  };
}
