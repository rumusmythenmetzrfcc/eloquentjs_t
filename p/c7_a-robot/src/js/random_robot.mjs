import {roadGraph} from "./road_graph.mjs";
import {VillageState, randomPick} from "./village_state.mjs";
import {runRobot} from "./run_robot.mjs";

function randomRobot(state){
  const dir = randomPick(roadGraph[state.place]);
  return {direction: dir};
}

runRobot(
  VillageState.random(),
  randomRobot
);