const express = require("express");
const fetch = require("node-fetch");
const DataManager = require("./modules/DataManager");
const app = express();

app.get("/", async (req, res) => {
    let response = await fetch("https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/car?format=json");
    let data = await response.json();
    let manager = new DataManager();
    let model = manager.process({
        rows: data.Results,
        body: req.body,
        query: req.query
    });

    res.json(model);
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));