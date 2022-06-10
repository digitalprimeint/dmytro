class Properties {
    process(model) {
        let { body, query } = model;
        let holder = {};

        if (body !== undefined) {
            let keys = Object.keys(body);
            keys.forEach(key => {
                if (body[key] !== null ||
                    Array.isArray(body[key]) ||
                    Object.keys(body[key]).length === 0) {
                    holder[key] = body[key];
                }
            });
        }

        if (query !== undefined) {
            let keys = Object.keys(query);
            keys.forEach(key => {
                if (query[key] !== null) {
                    holder[key] = query[key];
                }
            });
        }

        return { ...model, properties: holder }
    }
}

module.exports = Properties;