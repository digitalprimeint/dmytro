const geoip = require('geoip-country');
const ip = require('ip');

module.exports = (req, res, next) => {
    let ip_active = process.env.IP_ACTIVE === "REMOTE" ? ip.address() : process.env[process.env.IP_ACTIVE];

    let lookup = geoip.lookup(ip.address());
    lookup = lookup === null ? geoip.lookup(ip_active) : lookup;
    console.log("country", lookup === null ? "NOT FOUND" : lookup.country, "ip", ip.address());

    if(lookup !== null) {
        let country_code = lookup.country;
        let valid_countries = ['PA', 'CA']; // those countries could be collected from the database or cache.

        if(!valid_countries.includes(country_code)) {
            return res.status(400).json({ "errors": [{ "message": `Your country ${country_code} is not authorized.` }]});
        }

        res.set("Proxy-Country", country_code);
        next();
    }
    else {
        if(process.env.IP_DOCKER === "VALID") {
            next();
        }
        else {
            return res.status(400).json({ "errors": [{ "message": `Docker container IP is not valid.` }]});
        }
    }
}