import {reverse} from "./reverse.mjs";
import process from 'node:process';

let argument = process.argv[2];

console.log(`Argument: ${reverse(argument)}`);