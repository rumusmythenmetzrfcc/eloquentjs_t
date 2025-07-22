import {createReadStream} from "node:fs";
import {stat, readdir} from "node:fs/promises";
import {lookup} from "mime-types";

import {urlPath} from "./resolve.mjs";


export let getFunction = async function(request) {
  let path =  urlPath(request.url);
  let stats;
  try {
    stats = await stat(path);
  } catch(e) {
    if (e.code != "ENOENT") throw e;
    else return {status: 404, body: "File not found"};
  }
  if (stats.isDirectory()) {
    return {body: (await readdir(path)).join("\n")};
  } else {
    return {
      body: createReadStream(path),
      type: lookup(path)
    }
  }
};