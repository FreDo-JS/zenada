import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import heroImg from "./assets/hero.png";
import "./App.css";
import { useEffect } from "react";

function App() {
  const [stats, setStats] = useState(null);

  const fetchStats = async () => {
    const res = await fetch("http://localhost:3000/stats");
    const data = await res.json();
    setStats(data);
  };

  useEffect(() => {
    fetchStats();
    const interval = setInterval(fetchStats, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!stats) {
    return <div>Ładnowanie</div>;
  }
  const danger = stats.cpu > 30 || stats.ram > 10;
  return (
    <>
      <h1>System:</h1>

      <div
        className="box"
        style={{ backgroundColor: danger ? "red" : "black" }}
      >
        <p>CPU: {stats.cpu}</p>
      </div>
      <div
        className="box"
        style={{ backgroundColor: danger ? "red" : "black" }}
      >
        <p>Ram: {stats.ram}</p>
      </div>
    </>
  );
}

export default App;
