const db = require("../db");

exports.getAllTours = (req, res) => {
  db.query("SELECT * FROM tours", (err, results) => {
    if (err)
      return res
        .status(500)
        .json({ status: "error", message: "Failed to fetch data", error: err });

    res.json({
      status: "success",
      results: results.length,
      data: { tours: results },
    });
  });
};

exports.createTour = (req, res) => {
  const tour = req.body;
  db.query("INSERT INTO tours SET ?", tour, (err, results) => {
    if (err)
      return res
        .status(500)
        .json({ status: "error", message: "Failed to save tour", error: err });
    const id = results.insertId;
    res.json({
      status: "success",
      message: "Tour created",
      data: { tour: { id, ...tour } },
    });
  });
};

exports.checkID = (req, res, next, val) => {
  db.query("SELECT * FROM  tours WHERE id=?", val, (err, result) => {
    if (result.length === 0)
      return res.status(400).json({
        status: "fail",
        message: `Tour with id ${val} not found`,
      });

    next();
  });
};

exports.getTour = (req, res) => {
  const id = req.params.id;
  db.query("SELECT * FROM  tours WHERE id=?", id, (err, result) => {
    if (err)
      return res
        .status(500)
        .json({ status: "error", message: "Failed to get a tour", error: err });

    res.json({
      status: "success",
      data: { tour: result },
    });
  });
};

exports.updateTour = (req, res) => {
  const id = req.params.id;
  const tour = req.body;
  db.query("UPDATE tours SET ? WHERE ?", [tour, { id }], (err, result) => {
    if (err)
      return res.status(500).json({
        status: "error",
        message: "Failed to update a tour",
        error: err,
      });

    res.json({
      status: "success",
      data: { tour: { id, ...tour } },
    });
  });
};

exports.deleteTour = (req, res) => {
  const id = req.params.id;

  db.query("DELETE FROM tours WHERE ?", { id }, (err, result) => {
    if (err)
      return res.status(500).json({
        status: "error",
        message: "Failed to delete a tour",
        error: err,
      });

    res.json({
      status: "success",
      message: "Tour deleted",
    });
  });
};
