import { SWITCH_TO_QUIZ_MODE } from "../actions/actionVariables";
import { SWITCH_TO_SETUP_MODE } from "../actions/actionVariables";
const switchBetweenModesReducer = (state = true, action) => {
  const { type } = action;
  switch (type) {
    case SWITCH_TO_SETUP_MODE: {
      return true;
    }
    case SWITCH_TO_QUIZ_MODE: {
      return false;
    }
    default:
      return state;
  }
};
export default switchBetweenModesReducer;
