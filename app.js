const express = require("express");
const cors = require("cors");
const filmRoutes = require("./filmRoutes");
const app = express();
app.use(cors());
app.use(express.json());
app.use("/api", filmRoutes);
const port = 3000;


app.listen(port, () => {

  console.log(`FilmDB API server listening on http://localhost:${port}`);

});




module.exports = app;