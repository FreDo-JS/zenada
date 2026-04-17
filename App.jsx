import { use, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import heroImg from "./assets/hero.png";
import "./App.css";
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
function App() {
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
      <header>Job For Whites</header>
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

export default App;
