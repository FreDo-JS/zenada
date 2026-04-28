const express = require("express");
const system = require("systeminformation");
const cors = require("cors");

const app = express();
app.use(cors());

app.get("/stats", async (req, res) => {
  try {
    const cpu = await system.currentLoad();
    const mem = await system.mem();

    res.json({
      cpu: cpu.currentLoad.toFixed(2),
      ram: (mem.used / 1024 / 1024 / 1024).toFixed(2),
    });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

app.listen(3000, () => {
  console.log("Dziaua");
});
