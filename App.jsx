import { use, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import heroImg from "./assets/hero.png";
import "./App.css";
import { Route, Routes, Link, BrowserRouter } from "react-router";
function JobOffer({ title, company, type, stack, desc }) {
  const [modal, setModal] = useState(false);
  return (
    <>
      <div className="hi" onClick={() => setModal(true)}>
        <p>Firma: {company}</p>
        <h1>Stanowisko: {title}</h1>
        <p>
          <i>Tryb pracy: {type}</i>
        </p>
        <p>
          <b>{stack.join(" ")}</b>
        </p>
      </div>
      {modal && (
        <div className="overlay" onClick={() => setModal(false)}>
          <div className="content">{desc}</div>
        </div>
      )}
    </>
  );
}
function JobBoard() {
  const [filter, setFilter] = useState("all");
  const jobs = [
    {
      id: 1,
      company: "SGB-Bank",
      title: "Operator monitoringu IT",
      type: "On-site",
      stack: ["React", "JavaScript", "CSS"],
      desc: "Dla szefa",
    },
    {
      id: 2,
      company: "Jeronimo Martins",
      title: "Spec. ds. operacji centralnych systemów IT",
      type: "Remote",
      stack: ["Zabbix", "Grafana", "Angielski"],
      desc: "Dla szefaasdjiasjda",
    },
    {
      id: 3,
      company: "Teb Edukacja",
      title: "Boss",
      type: "Shit",
      stack: ["React", "JavaScript", "Bycie sigma"],
      desc: "Dla nauczyciela",
    },
  ];
  const filteredJobs =
    filter === "all" ? jobs : jobs.filter((job) => job.type === filter);

  return (
    <>
      <section>
        <button
          onClick={() => setFilter("Remote")}
          style={{ backgroundColor: filter === "Remote" ? "yellow" : "white" }}
        >
          Remote
        </button>
        <button onClick={() => setFilter("On-site")}>On-site</button>
        <button onClick={() => setFilter("all")}>Wszystkie</button>
      </section>
      <main>
        {filteredJobs.map((job) => (
          <JobOffer key={job.id} {...job} />
        ))}
      </main>
    </>
  );
}
function App() {
  return (
    <>
      <BrowserRouter>
        <header>Job For </header>
        <nav>
          <Link to="/">Strona główna</Link>
          <Link to="/add">Dodaj oferte</Link>
          <Link to="/contact">Kontakt</Link>
        </nav>
        <Routes>
          <Route path="/" element={<JobBoard />} />
          <Route path="/add" element={<h1>Dodaj</h1>} />
          <Route path="/contact" element={<h1>Kontakt</h1>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
