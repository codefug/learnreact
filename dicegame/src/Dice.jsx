// Dice.jsx
import diceBlue01 from "./assets/dice-blue-1.svg";
import diceBlue02 from "./assets/dice-blue-2.svg";
import diceBlue03 from "./assets/dice-blue-3.svg";
import diceBlue04 from "./assets/dice-blue-4.svg";
import diceBlue05 from "./assets/dice-blue-5.svg";
import diceBlue06 from "./assets/dice-blue-6.svg";
import diceRed01 from "./assets/dice-red-1.svg";
import diceRed02 from "./assets/dice-red-2.svg";
import diceRed03 from "./assets/dice-red-3.svg";
import diceRed04 from "./assets/dice-red-4.svg";
import diceRed05 from "./assets/dice-red-5.svg";
import diceRed06 from "./assets/dice-red-6.svg";

const dices = {
  blue: [
    null,
    diceBlue01,
    diceBlue02,
    diceBlue03,
    diceBlue04,
    diceBlue05,
    diceBlue06,
  ],
  red: [
    null,
    diceRed01,
    diceRed02,
    diceRed03,
    diceRed04,
    diceRed05,
    diceRed06,
  ],
};

const Dice = ({ num, color }) => {
  // destructuring
  return dices[color][num] ? (
    <img src={dices[color][num]} alt="주사위" />
  ) : (
    <p>미안해요 그런 주사위는 없네요</p>
  );
};

export default Dice;