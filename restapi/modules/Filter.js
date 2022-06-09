class Filter {
    process(model) {
        let { properties, rows } = model;
        let keys = Object.keys(properties);

        let result = rows.filter(row => {
            let valid = true;

            for(let i = 0; i < keys.length; i++){
                let key = keys[i];
                if(key !== "_includes" && row[key] != properties[key]) {
                    valid = false;
                }
            }

            return valid;
        });

        return { ...model, rows: result };
    }
}

module.exports = Filter;