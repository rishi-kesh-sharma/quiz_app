import { ADD_SETUP } from "../actions/actionVariables";
const addSetUpReducer = (state, action) => {
  const { type } = action;
  switch (type) {
    case ADD_SETUP: {
      const { amount, category, difficultyLevel } = action.addSetUp;
      return {
        ...state,
        amount: amount,
        category: category,
        difficultyLevel: difficultyLevel,
      };
    }
    default:
      return {};
  }
};
export default addSetUpReducer;
