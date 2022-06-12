const { gql } = require("apollo-server");

const typeDefs = gql`
    input FilterEmployee {
        employeeNumber : ID
        lastName : String
        firstName : String
        extension : String
        email : String
        officeCode : String
        reportsTo : Int
        jobTitle : String
    }

    extend type Query {
        employees(filter: FilterEmployee, sort: [[String]], limit: Int, offset: Int, search: Boolean) : [Employee]
    }

    type Employee {
        employeeNumber : ID!
        lastName : String
        firstName : String
        extension : String
        email : String
        officeCode : String
        reportsTo : Int
        jobTitle : String
        customers: [Customer]
    }
`;

const resolvers = {
    Query: {
        employees: (_, args, context, info) => {
            let filter = args.filter;
            if(args.filter !== undefined && args.search === true) {
                filter = { ...args.filter };
                Object.keys(filter).map(key => {
                    if(typeof filter[key]  === "string") {
                        filter[key] = {
                            [context.Op.like]: `%${args.filter[key]}%`
                        }
                    }
                });
            }

            return context.db.employees.findAll({where: filter, order: args.sort, limit: args.limit, offset: args.offset});
        }
    },
    Employee: {
        customers: (obj, args, context, info) => {
            return context.db.customers.findAll({where: { salesRepEmployeeNumber: obj.employeeNumber }});
        }
    }
}

module.exports.typeDefs = typeDefs;
module.exports.resolvers = resolvers;