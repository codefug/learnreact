import Dice from "./Dice";
import "./App.css";

function Board({ name, color, array }) {
  const num = array[array.length - 1] || 1;
  const sum = array.reduce((previousValue, currentValue) => {
    previousValue += currentValue;
  }, 0);
  return (
    <div>
      <h2>{name}</h2>
      <Dice num={num} color={color} />
      <h2>총점</h2>
      <p>{sum}</p>
      <h2>기록</h2>
      <p>{array.join(" ,")}</p>
    </div>
  );
}

export default Board;
