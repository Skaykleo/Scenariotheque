// src/App.js
import { useEffect } from "react";
import { getScenarios } from "./services/scenario.service";

function App() {

  useEffect(() => {
    async function test() {
      const scenarios = await getScenarios();
      console.log(scenarios);
    }

    test();
  }, []);

  return <div>Test API</div>;
}

export default App;