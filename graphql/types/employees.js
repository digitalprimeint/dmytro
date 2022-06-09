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
        employees(filter: FilterEmployee, sort: [[String]], limit: Int, offset: Int) : [Employee]
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
    }
`;

const resolvers = {
    Query: {
        employees: (_, args, context, info) => {
            return context.db.employees.findAll({where: args.filter, order: args.sort, limit: args.limit, offset: args.offset});
        }
    }
}

module.exports.typeDefs = typeDefs;
module.exports.resolvers = resolvers;