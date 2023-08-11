import React, { useState } from "react";
import HomeScreen from "./screen/HomeScreen";
import Scenario1 from "./screen/Scenario1";
import { Screen } from "./constants";
import Scenario2 from "./screen/Scenario2";

const App = () => {
  const [currentScreen, setCurrentScreen] = useState(Screen.SCENARIO_1);

  const handleScreenChange = (screen) => {
    setCurrentScreen(screen);
  };

  const handleBackClick = () => {
    setCurrentScreen(Screen.HOME_SCREEN);
  };

  return (
    <div className="App">
      {currentScreen === Screen.HOME_SCREEN && (
        <HomeScreen onScreenChange={handleScreenChange} />
      )}
      {currentScreen === Screen.SCENARIO_1 && (
        <>
          {/* <div className="progress-bar-container">
            <label htmlFor="progress-bar">Loading...</label>
            <progress id="progress-bar" value="0" max="100"></progress>
          </div> */}
          <div>
            <button onClick={handleBackClick}>Back</button>
            <Scenario1 />
          </div>
        </>
      )}
      {currentScreen === Screen.SCENARIO_2 && (
        <div>
          <button onClick={handleBackClick}>Back</button>
          <Scenario2 />
        </div>
      )}
    </div>
  );
};

export default App;
