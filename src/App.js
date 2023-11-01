import { useEffect, useState } from "react";
import Lawdle from "./components/Lawdle";

function App() {
  const [solution, setSolution] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3001/solutions")
      .then((res) => res.json())
      .then((json) => {
        const randomSolution = json[Math.floor(Math.random() * json.length)];
        setSolution(randomSolution.word);
      });
  }, [setSolution]);

  return (
    <div className="App">
      {console.log(solution)}
      <h1>Lawdle</h1>
      {solution && <Lawdle solution={solution} />}
    </div>
  );
}
export default App;
