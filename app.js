const express = require("express");
const db = require("./db");

const app = express();

app.use(express.json());

app.get("/api/v1/tours", (req, res) => {
  db.query("SELECT * FROM tours", (err, results, fields) => {
    if (err)
      return res
        .status(500)
        .json({ status: "error", message: "Failed to fetch data" });

    res.json({
      status: "success",
      results: results.length,
      data: { tours: results },
    });
  });
});

app.post("/api/v1/tours", (req, res) => {
  const tour = req.body;
  db.query("INSERT INTO tours SET ?", tour, (err, results) => {
    if (err)
      return res
        .status(500)
        .json({ status: "error", message: "Failed to save tour" });
    const id = results.insertId;
    res.json({
      status: "success",
      message: "Tour created",
      data: { tour: { id, ...tour } },
    });
  });
});

app.get("/api/v1/tours/:id", (req, res) => {
  const id = req.params.id;
  db.query("SELECT * FROM  tours WHERE id=?", id, (err, results) => {
    if (err)
      return res
        .status(500)
        .json({ status: "error", message: "Failed to get a tour" });

    res.json({
      status: "success",
      data: { tour: results },
    });
  });
});

app.listen(8000, () => {
  console.log("Server is running on port 8000");
});
