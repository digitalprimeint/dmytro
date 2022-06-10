const express = require("express");
const proxy = require('express-http-proxy');

const app = express();

app.use("/cars", proxy(process.env.API_REST_HOST, {
    https: process.env.PROXY_HTTPS === undefined ? false : true
}));
app.use("/", proxy(process.env.API_GRAPHQL_HOST, {
    https: process.env.PROXY_HTTPS === undefined ? false : true
}));

app.listen(3000, () => console.log("Server running on http://localhost:3000"));