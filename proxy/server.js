const express = require("express");
const proxy = require('express-http-proxy');
const rateLimit = require('express-rate-limit');
const bodyParser = require('body-parser');
const apicountry = require('./middlewares/ipcountry');
const authorization = require('./middlewares/authorization');

const app = express();
app.enable('trust proxy');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(apicountry);
app.use(authorization);

app.use(rateLimit({
	windowMs: 60 * 1000,
	max: 10,
	standardHeaders: true,
	legacyHeaders: false,
    message: { "errors": [{ "message": "Too many requests, please try again later." }]}
}));


app.use("/", proxy(process.env.API_GATEWAY));

app.listen(3000, () => console.log("Server running on http://localhost:3000"));