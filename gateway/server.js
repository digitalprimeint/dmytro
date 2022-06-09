const express = require("express");
const proxy = require('express-http-proxy');

const app = express();

app.use("/weather", proxy(process.env.API_REST_HOST));
app.use("/", proxy(process.env.API_GRAPHQL_HOST));

app.listen(3000, () => console.log("Server running on http://localhost:3000"));