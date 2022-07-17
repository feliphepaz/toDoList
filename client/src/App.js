import { useEffect } from "react";
import "./App.css";
import axios from "axios";

function App() {
  async function newList() {
    axios.post("http://localhost:8080/list/register", {
      message: "Testando",
    });
  }

  useEffect(() => {}, []);
  return <div className="App"></div>;
}

export default App;
