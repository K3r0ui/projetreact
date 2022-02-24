import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [msg, setMsg] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(
        `http://${process.env.REACT_APP_BACKEND_DNS}:8080/`
      );
      setMsg(data);
    };
    fetchData();
  }, []);

  return <div className="App">{msg}</div>;
}

export default App;
