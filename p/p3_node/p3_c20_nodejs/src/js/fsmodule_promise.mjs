import {readFile, writeFile} from "node:fs/promises";
import {readFileSync} from "node:fs";

readFile("./media/file.txt", "utf8")
  .then(text => console.log("Contains:", text));

console.log("C:", readFileSync("./media/file.txt", "utf8"));

writeFile("./media/graffiti.txt", "Node was here")
  .then(console.log("File written."));
