import {roadGraph} from './road_graph.mjs';

export class VillageState {
  constructor(place, parcels) {
    this.place = place;
    this.parcels = parcels;
  }

  move(destination) {
    if (roadGraph[this.place].includes(destination))
      return this.createNew(destination);
    else
      return this;
  }

  createNew(destination) {
    return new VillageState(
      destination,
      this.moveForwardAndDropParcels(destination)
    );
  }

  moveForwardAndDropParcels(destination) {
    return this.parcels.map(p => {
      if (p.place != this.place)
        return p;
      else
        return {place: destination, address: p.address};

    }).filter(p => p.place != p.address);
  }
}

VillageState.random = function (parcelCount = 5) {
  let parcels = [];
  for (let i = 0; i < parcelCount; i++) {
    let address = randomPick(Object.keys(roadGraph));
    let place;
    do {
      place = randomPick(Object.keys(roadGraph));
    } while (place == address);
    parcels.push({place, address});
  }
  return new VillageState("Post Office", parcels);
};
export function randomPick(array) {
  let choice = Math.floor(Math.random() * array.length);
  return array[choice];
}