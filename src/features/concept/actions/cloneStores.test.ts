import { cloneStores } from "./cloneStores";

describe("cloneStores tests", () => {
  it("should do something", () => {
    let getState = jest.fn();
    let dispatch = jest.fn();

    let action = cloneStores({ conceptId: "123", storeId: "321" });
    let promise = action(dispatch, getState, {});
  });
});
