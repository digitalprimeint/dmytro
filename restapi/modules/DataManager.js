const Properties = require("./Properties");
const PropertyValidation = require("./PropertyValidation");
const Sort = require("./Sort");
const Filter = require("./Filter");
const Includes = require("./Includes");

class DataManager {
    constructor() {
        this.commands = [
            new Properties(),
            new PropertyValidation(),
            new Sort(),
            new Filter(),
            new Includes()
        ]
    }

    process(options) {
        let opts = Object.assign({}, {
            rows: [],
            properties: {},
            body: {},
            query: {}
        }, options);

        if(opts.rows.length === 0) {
            return {
                data: []
            }
        }

        try {
            for (let i = 0; i < this.commands.length; i++) {
                let cmd = this.commands[i];
                opts = cmd.process(opts);
            }

            return {
                data: opts.rows
            }
        }
        catch (error) {
            console.log(error);
            return {
                errors: [error.message]
            }
        }
    }

}

module.exports = DataManager;