import React from "react";
import { useDispatch } from "react-redux";
import { ADD_SETUP, SWITCH_TO_QUIZ_MODE } from "../actions/actionVariables";
import "./SetUp.css";

const SetUp = () => {
  //use dispatch hook

  const dispatch = useDispatch();
  let amount = 0;
  let category = "politics";
  let difficultyLevel = "medium";

  // submit handler for submit button

  const submitHandle = (e) => {
    e.preventDefault();

    //  dispatching the switch to quiz mode action

    dispatch({
      type: SWITCH_TO_QUIZ_MODE,
    });
    const setUpData = { amount, category, difficultyLevel };

    // dispatching the setup data using Add setup action

    dispatch({
      type: ADD_SETUP,
      addSetUp: setUpData,
      payload: {
        addSetUp: setUpData,
      },
    });
  };

  // handling the change event on all input fields

  const changeHandle = (e) => {
    const receivedValue = e.target.value;
    if (e.target.classList.contains("difficulty-level")) {
      difficultyLevel = receivedValue;
    }
    if (e.target.classList.contains("amount")) {
      amount = receivedValue;
    }
    if (e.target.classList.contains("category")) {
      category = receivedValue;
    }
  };
  return (
    <div className="setup-form-container">
      <h1> QUIZ SETUP</h1>
      <form onSubmit={submitHandle}>
        <div className="form-element">
          <label htmlFor="no-of-questions"> Number of Questions</label>
          <input
            onChange={changeHandle}
            className="amount"
            type="number"
            name="no-of-questions"
            min="5"
            max="20"
            required
            placeholder="5"
          />
        </div>

        <div className="form-element">
          <label htmlFor="category">Category</label>
          <select
            onChange={changeHandle}
            className="category"
            name="category"
            required>
            <option>sports</option>
            <option>politics</option>
            <option>history</option>
          </select>
        </div>

        <div className="form-element">
          <label>Select Difficulty</label>
          <select
            onChange={changeHandle}
            className="difficulty-level"
            name="category"
            required>
            <option>hard</option>
            <option>medium</option>
            <option>easy</option>
          </select>
        </div>

        <div className="form-element">
          <input type="submit" value="submit" />
        </div>
      </form>
    </div>
  );
};

export default SetUp;
