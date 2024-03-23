import { useState } from "react";
import { useAuth } from "@clerk/clerk-react";
import "./styles/App.css";

const apiUrl = "http://localhost:4000/api/v1";

function App() {
  const [message, setMessage] = useState("");
  console.log({ message });
  async function getHello() {
    fetch(`${apiUrl}/hello`, {
      headers: { Authorization: `Bearer ${await getToken()}` },
    })
      .then((res) => res.json())
      .then((data) => setMessage(data.message));
  }

  const { getToken } = useAuth();
  async function getWelcome() {
    fetch(`${apiUrl}/welcome`, {
      headers: { Authorization: `Bearer ${await getToken()}` },
    })
      .then((res) => res.json())
      .then((data) => setMessage(data.message));
  }

  return (
    <div className="app">
      <h1>Final project</h1>
      <div>
        <button onClick={getHello}>Get Hello</button>
        <button onClick={getWelcome}>Get Welcome</button>
      </div>
      <p>{message}</p>
    </div>
  );
}

export default App;
