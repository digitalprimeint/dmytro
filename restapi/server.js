const express = require("express");
const fs = require('fs');
const path = require('path');
const DataManager = require("./modules/DataManager");
const app = express();

var data = { Results: [] };

app.get("/", async (req, res) => {

    try {
        if(data.Results.length === 0) {
            let file_path = path.resolve(__dirname, "data.json");
            let rawdata = fs.readFileSync(file_path);
            data = JSON.parse(rawdata);

            console.log("DATA LOADED", data.Results.length);
        }

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