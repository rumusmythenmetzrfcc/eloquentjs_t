import {createServer} from "node:http";
import {methods} from "./methods.mjs";

createServer((request, response) => {
  let handler = methods[request.method] || notAllowed;
  handler(request).catch((err) => {
    if (err.status != null) return err;
    return {body: String(err), status: 500};
  }).then(({body, status = 200, type = "text/plain"}) => {
    response.writeHead(status, {"Content-Type": "type"});
    if (body?.pipe) body.pipe(response);
    else response.end(body);
  });
}).listen(8000);

async function notAllowed(request) {
  return {
    status: 405,
    body: `Method ${request.method} not allowed.`
  };
}