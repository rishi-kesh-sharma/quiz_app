import { combineReducers } from "redux";
import addQandAReducer from "./addQandAReducer";
import switchBetweenModes from "./switchBetweenModes";
import addSetUpReducer from "./addSetUpReducer";
const rootReducer = combineReducers({
  addQandAReducer,
  switchBetweenModes,
  addSetUpReducer,
});
export default rootReducer;
