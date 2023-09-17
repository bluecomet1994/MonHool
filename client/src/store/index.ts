import { combineReducers, createStore } from "redux";
import staking from "./reducers";

const store = createStore(
  combineReducers({ staking })
);

export default store;