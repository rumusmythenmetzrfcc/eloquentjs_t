import {mailRoute} from "./road_graph.mjs";
import {VillageState} from "./village_state.mjs";
import {runRobot} from "./run_robot.mjs";

function routeRobot (state, memory) {
  if (memory == 0) {
    memory = mailRoute;
  }
  return {
    direction: memory[0],
    memory: memory.slice(1)
  };
}

runRobot(
  VillageState.random(),
  routeRobot,
  mailRoute
);