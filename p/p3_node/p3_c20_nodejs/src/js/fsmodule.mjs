import {readFile, writeFile} from "node:fs";

readFile("./media/file.txt", (err, data) => {
  if (err) { throw err; }
  console.log("Contains:", data);
  console.log("#ofBytes:", data.length);
  console.log("#1:", data[0]);
})

writeFile("./media/graffiti.txt", "Node was here", err => {
  if (err) { throw err; }
  else console.log("File written.");
});