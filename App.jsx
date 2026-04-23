import { use, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import heroImg from "./assets/hero.png";
import 'bootstrap/dist/css/bootstrap.css'
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
function JobBoard({jobs}) {
  const [filter, setFilter] = useState("all");
 
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
function AddJob({jobs, setJobs})
{
  const [form, setForm] = useState({
    company: "", title: "", type: '', stack: '', desc: ''
  })

  function handleChange(e)
  {
     setForm({...form, [e.target.name]: e.target.value})
  }

  function handleSubmit()
  {
    if(!form.company || !form.title)
    {
      alert('Wprowadz dane')
      return
    }
    const newOffer ={
      ...form,
      id: jobs.length + 1,
      stack: form.stack.split(',').map(s => s.trim())

    }
    setJobs([...jobs, newOffer])
    alert('Dodano!')
  }
  return <>
  <h1>Dodaj oferte</h1>
  <div className="form-group">
      <input className="form-control" type="text" name="company" placeholder="Nazwa firmy" onChange={handleChange}/>
      <input className="form-control" type="text" name="title" placeholder="Stanowisko" onChange={handleChange}/>
      {/* <p>Opcje pracy</p> */}
      <select className="form-control" name="type" id="" value={form.type} onChange={handleChange}>
        <option value="">Wybierz</option>
        <option value="On-site">On-site</option>
        <option value='Remote'>Remote</option>
      </select>
      <input className="form-control" type="text" name="stack" placeholder="Technologie" onChange={handleChange}/>
      <textarea className="form-control" name="desc" cols={30} rows={10} id="" onChange={handleChange}></textarea>
      <button onClick={handleSubmit} className="btn btn-primary">Dodaj</button>
  </div>
  </>
}
function App() {
  const [jobs, setJobs] = useState( [
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
  ])
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
          <Route path="/" element={<JobBoard  jobs={jobs}/>} />
          <Route path="/add" element={<AddJob jobs={jobs} setJobs={setJobs}/>} />
          <Route path="/contact" element={<h1>Kontakt</h1>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;