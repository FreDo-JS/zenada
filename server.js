// const math = require("./siemanko.js");

// console.log(math.add(2, 3));
// console.log(math.multiply(2, 2));

// const http = require("http");
// const os = require("os");

// const app = http.createServer((req, res) => {
//   res.writeHead(200, { "Content-type": "text/plain" });

//   res.end(`<p>Pamięć ram: ${os.totalmem} Typ systemu: ${os.type}</p>`);
// });
// app.listen(3000, () => {
//   console.log("Serwer dzialą");
// });

const express = require("express");

const cors = require("cors"); // <-- ZAINSTALUJ: npm install cors

const app = express();
app.use(cors()); // <-- DODAJ TO ZARAZ POD express()
app.use(express.json());

const users = [
  { id: 1, name: "Stanislaw", role: "GameDev" },
  { id: 2, name: "Piotr", role: "Frontend" },
  { id: 3, name: "Alan", role: "Backend" },
];

app.get("/users/:id", (req, res) => {
  const idAdresu = req.params.id;

  const idLiczbowe = parseInt(idAdresu);

  const findUser = users.find((user) => user.id === idLiczbowe);

  if (findUser) {
    res.json(findUser);
  } else {
    res.status(404).json({ error: "Bład" });
  }
});
app.post("/users", (req, res) => {
  const newUser = {
    id: users.length + 1,
    name: req.body.name,
    role: req.body.role,
  };

  users.push(newUser);

  console.log(`Dodano ${newUser}`);

  res.status(201).json({ message: "DODANO", user: newUser });
});

app.delete("/users/:id", (req, res) => {
  const idAdresu = req.params.id;

  const idLiczbowe = parseInt(idAdresu);

  const findUser = users.findIndex((user) => user.id === idLiczbowe);

  if (findUser !== -1) {
    users.splice(findUser, 1);

    res.json({ meesage: "Sukces, usunięto" });
  } else {
    res.status(404).json({ message: "Bład" });
  }
});

app.put("/users/:id", (req, res) => {
  const idAdresu = req.params.id;

  const idLiczbowe = parseInt(idAdresu);

  const findUser = users.find((user) => user.id === idLiczbowe);

  if (findUser) {
    findUser.name = req.body.name || findUser.name;
    findUser.role = req.body.role || findUser.role;
    res.json({ message: "Dane update" });
  } else {
    res.status(404).json({ error: "Bład" });
  }
});

app.get("/users", (req, res) => {
  res.json(users);
});
app.get("/", (req, res) => {
  res.send("<p>h</p>");
});

app.get("/about", (req, res) => {
  res.send("<p>Sebastian</p>");
});

app.get("/contact", (req, res) => {
  res.send("<p>email: CO CIE TO POZDR ssssssssO</p>");
});
app.listen(3000, () => {
  console.log("Serwer działa");
});
