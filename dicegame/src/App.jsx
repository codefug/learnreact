import { useState } from "react";
import Board from "./Board";
import Button from "./Button";
import "./App.css";

function App() {
  const [myHistory, setMyHistory] = useState([]);
  const [otherHistory, setOtherHistory] = useState([]);

  const random = (n) => {
    return Math.ceil(Math.random() * n);
  };

  const handleRollClick = () => {
    let randomNumber = random(6);
    setMyHistory([...myHistory, randomNumber]);
    randomNumber = random(6);
    setOtherHistory([...myHistory, randomNumber]);
  };

  const handleClearClick = () => {
    setMyHistory([]);
    setOtherHistory([]);
  };
  return (
    <div className="flexColumn">
      <div className="app">
        <Button onClick={handleRollClick} color="blue" className={"app-button"}>
          던지기
        </Button>
        <Button onClick={handleClearClick} color="red" className={"app-button"}>
          처음부터
        </Button>
      </div>
      <div className="flexRow">
        <Board name="나" color="blue" array={myHistory} />
        <Board name="상대" color="red" array={otherHistory} />
      </div>
    </div>
  );
}
export default App;
