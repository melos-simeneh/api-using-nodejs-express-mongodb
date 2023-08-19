const express = require("express");
const db = require("./db");

const app = express();

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

app.listen(8000, () => {
  console.log("Server is running on port 8000");
});
