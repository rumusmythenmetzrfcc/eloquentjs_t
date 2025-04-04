import{ VillageState } from '../../src/js/village_state.mjs';

describe("VillageState moves with dropping parcels on the way", function () {
  let first = new VillageState(
    "Post Office",
    [{place: "Post Office", address: "Alice's House"}]
  );

  it("next is correct", function () {
    let next = first.move("Alice's House");

    expect(next.place).toBe("Alice's House");
    expect(next.parcels).toHaveSize(0);
  });
  it("first is a immutable value object", function () {
    expect(first.place).toBe("Post Office");
  });
});