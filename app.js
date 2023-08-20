const express = require("express");
const tourRouter = require("./routes/tour.routes");
const app = express();

//MIDDLEWARES
app.use(express.json());

//ROUTES
app.use("/api/v1/tours", tourRouter);

app.use((req, res) => {
  return res
    .status(404)
    .json({ status: "fail", message: `API URL ${req.url} not found` });
});

app.listen(8000, () => {
  console.log("Server is running on port 8000");
});
