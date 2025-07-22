import {resolve, sep} from "node:path";

const baseDirectory = process.cwd();

export function urlPath(url) {
  let {pathname} = new URL(url, "http://d");
  let path = resolve(decodeURIComponent(pathname).slice(1));
  if (path != baseDirectory && !path.startsWith(baseDirectory + sep)) {
    throw {status: 403, body: "Forbidden"};
  }
  return path;
}