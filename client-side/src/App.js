import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';
import React from 'react';

function App() {
  const [msg, setMsg] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(
      //  `http://${process.env.REACT_APP_BACKEND_DNS}:8080/`, {
        'http://localhost:8080/', {
        headers: {
          'api_key': '=sqfusqhfhkjdshfjsf65464dsfd8sq8+'
        }
      }
      );
      setMsg(data);
    };
    fetchData();
  }, []);

  return (
    <div className="App">
     <h1>welcome {msg} </h1>
    </div>
  );
}

export default App;
