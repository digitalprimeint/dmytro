class PropertyValidation {
    process(model) {
        let { rows, properties } = model;
        let row = rows[0];
        let keys = Object.keys(properties);
        let valid_keys = ["_sort", "_includes"];

        for(let i = 0; i < keys.length; i++) {
            let key = keys[i];

            if(!valid_keys.includes(key) && row[key] === undefined) {
                throw new Error(`The field name ${key} is not valid. The valid fields are: ${Object.keys(row).join()}`);
            }
        }

        return { ...model };
    }
}

module.exports = PropertyValidation;