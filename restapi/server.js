const express = require("express");
const fetch = require("node-fetch");
const DataManager = require("./modules/DataManager");
const app = express();

app.get("/", async (req, res) => {

    try {
        let response = await fetch("https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/car?format=json");
        let data = await response.json();
        let manager = new DataManager();

        if(req.query["_authorization"] !== undefined) {
            delete req.query["_authorization"];
        }
        
        let model = manager.process({
            rows: data.Results,
            body: req.body,
            query: req.query
        });

        res.json(model);
    }
    catch (error) {
        res.status(400).json({ error: { errors: [error.message]}});
    }
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));