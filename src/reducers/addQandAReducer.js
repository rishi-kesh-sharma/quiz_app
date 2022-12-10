import { ADD_Q_AND_A } from "../actions/actionVariables";

const addQandAReducer = (state, action) => {
  const { type } = action;

  switch (type) {
    case ADD_Q_AND_A: {
      return action.data;
    }
    default:
      return [];
  }
};
export default addQandAReducer;
