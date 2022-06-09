class Sort {
    process(model) {
        let { rows, properties } = model;
        let sort_str = properties["_sort"];

        if (sort_str !== undefined) {
            rows.sort((a, b) => {

                if (typeof a[sort_str] === "number") {
                    return a[sort_str] - b[sort_str];
                }
                else {
                    let a_str = a[sort_str].toString().toLowerCase();
                    let b_str = b[sort_str].toString().toLowerCase();

                    if (a_str < b_str) {
                        return -1;
                    }

                    if (a_str > b_str) {
                        return 1;
                    }

                    return 0;
                }
            });
        }

        delete properties["_sort"];
        return { ...model, rows: rows, properties: properties }
    }
}

module.exports = Sort;