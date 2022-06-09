class Includes {
    process(model) {
        let { properties, rows } = model;
        let includes_str = properties["_includes"];

        if(includes_str !== undefined) {
            let includes = includes_str.split(",");

            let result = rows.map(row => {
                let keys = Object.keys(row);
                let data = {};
    
                for(let i = 0; i < keys.length; i++){
                    let key = keys[i];
                    if(includes.includes(key)) {
                        data[key] = row[key];
                    }
                }
    
                return data;
            });
    
            return { ...model, rows: result };
        }

        return { ...model };
    }
}

module.exports = Includes;