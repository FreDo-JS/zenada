const express = require("express");
const system = require("systeminformation");
const cors = require("cors");

const app = express();
app.use(cors());

app.get("/stats", async (req, res) => {
  try {
    const cpu = await system.currentLoad();
    const ram = await system.mem();

    res.json({
      cpu: cpu.currentLoad(),
      ram: (ram.mem / 1024 / 1024 / 1024).toFixed(2),
    });
  } catch (err) {
    res.json({ erorr: err });
  }
});

app.listen(3000, () => {
  console.log("Serwer uruchomiony");
});
