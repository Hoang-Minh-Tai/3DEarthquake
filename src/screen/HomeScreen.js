import React from "react";
import { Screen } from "../constants";

const HomeScreen = ({ onScreenChange }) => {
  return (
    <div className="home-screen">
      <h1>Welcome to Earthquake Safety App</h1>
      <button onClick={() => onScreenChange(Screen.SCENARIO_1)}>
        Scenario 1
      </button>
      <button onClick={() => onScreenChange(Screen.SCENARIO_2)}>
        Scenario 2 (Coming Soon)
      </button>
    </div>
  );
};

export default HomeScreen;
