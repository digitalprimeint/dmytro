const express = require("express");
const fetch = require("node-fetch");
const app = express();

app.get("/", async (req, res) => {
    let response = await fetch("https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/car?format=json");
    let data = await response.json();

    res.json(data);
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));