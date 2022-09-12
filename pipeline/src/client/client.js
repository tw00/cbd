import request from "../utils/fetch.js";

async function publishComponent(endpoint, id, content) {
  const { body } = await request(`${endpoint}?id=${id}`, {
    method: "POST",
    body: content,
    headers: { "Content-Type": "text/javascript" },
  });
  return body;
}

async function getComponent(endpoint, id) {
  const { body } = await request(`${endpoint}?id=${id}`, {
    method: "GET",
  });
  return body;
}

export default function clientFactory(url) {
  return {
    publishComponent: (...args) => publishComponent(url, ...args),
    getComponent: (...args) => getComponent(url, ...args),
  };
}
