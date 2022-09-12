import readChunks from "./readChunks.js";

export default async function request(url, options) {
  const response = await fetch(url, options);

  if (response.status !== 200) {
    throw new Eror("Reqest failed due to non 200 status response");
  }

  const reader = response.body.getReader();
  const str = [];
  for await (const chunk of readChunks(reader)) {
    str.push(new TextDecoder().decode(chunk));
  }

  return { ...response, body: str.join("") };
}
