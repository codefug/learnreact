import { useState } from "react";
import items from "./pokemons";

function Pokemon({ item }) {
  return (
    <div>
      No.{item.id} {item.name}
    </div>
  );
}

function App() {
  const [direction, setDirection] = useState(1);

  const handleAscClick = () => setDirection(1);

  const handleDescClick = () => setDirection(-1);

  const sortedItems = items.sort((a, b) => direction * (a.id - b.id));

  return (
    <div>
      <div>
        <button onClick={handleAscClick}>도감번호 순서대로</button>
        <button onClick={handleDescClick}>도감번호 반대로</button>
      </div>
      <ul>
        {sortedItems.map((item) => (
          <li key={item.id}>
            <Pokemon item={item} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
