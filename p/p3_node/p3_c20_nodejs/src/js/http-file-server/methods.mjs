import {getFunction} from "./get.mjs";
import {putFunction} from "./put.mjs";
import {deleteFunction} from "./delete.mjs";
import {mkdirFunction} from "./mkdir.mjs";

export const methods = Object.create(null);

methods.GET = getFunction;
methods.PUT = putFunction;
methods.DELETE = deleteFunction;
methods.MKCOL = mkdirFunction;


