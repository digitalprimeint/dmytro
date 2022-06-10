module.exports = async (req, res, next) => {
    if (req.method === "OPTIONS") return next();
    if (req.body.operationName !== undefined && req.body.operationName === "IntrospectionQuery") return next();

    let token = req.headers.authorization === undefined ? req.query["_authorization"] : req.headers.authorization;
    console.log("Authorization", req.headers.authorization, req.query["_authorization"]);

    try {
        if (token === undefined) throw new Error("Invalid Token");
        let includeBearer = token.indexOf("Bearer") !== -1;

        if(includeBearer === true) {
            if (token.indexOf("Bearer") === -1) throw new Error("Invalid Token");
            if (token.split(" ").length !== 2) throw new Error("Invalid Token");

            token = token.split(" ")[1];
        }

        let buff = Buffer.from(token, 'base64');
        let text = buff.toString('ascii');

        if (text.indexOf(":") === -1) throw new Error("Invalid Token");
        if (text.split(":").length !== 2) throw new Error("Invalid Token");

        // This logic must be collected from a data source: API, Database, Cache, JWT, etc.
        let user = process.env.PROXY_USER;
        let password = process.env.PROXY_PASSWORD;

        if (text.split(":")[0] !== user) throw new Error("Invalid Token");
        if (text.split(":")[1] !== password) throw new Error("Invalid Token");

        res.set("Proxy-Authorization", "Valid");

        return next();
    }
    catch (error) {
        console.log(error);
        return res.status(400).json({ error: { "errors": [{ "message": error.message }]}});
    }
}