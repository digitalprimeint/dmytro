const geoip = require('geoip-country');

module.exports = (req, res, next) => {
    let ip1 = req.headers["x-forwarded-for"];
    let ip_active = process.env.IP_ACTIVE === "REMOTE" ? ip1 : process.env[process.env.IP_ACTIVE];

    let lookup = geoip.lookup(ip1);
    lookup = lookup === null ? geoip.lookup(ip_active) : lookup;
    console.log("country", lookup === null ? "NOT FOUND" : lookup.country, "ips", ip1);
    console.log(req.headers);

    if(lookup !== null) {
        let country_code = lookup.country;
        let valid_countries = process.env.COUNTRY_CODES !== undefined ? process.env.COUNTRY_CODES.split(",") : ['PA', 'CA']; // those countries could be collected from the database or cache.

        if(!valid_countries.includes(country_code)) {
            return res.status(400).json({ error: { "errors": [{ "message": `Your country ${country_code} is not authorized.` }]}});
        }

        res.set("Proxy-Country", country_code);
        next();
    }
    else {
        if(process.env.IP_DOCKER === "VALID") {
            next();
        }
        else {
            return res.status(400).json({ error: { "errors": [{ "message": `Docker container IP is not valid.` }]}});
        }
    }
}