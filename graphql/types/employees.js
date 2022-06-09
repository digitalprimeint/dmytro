const { gql } = require("apollo-server");

const typeDefs = gql`
    extend type Query {
        employees : [Employee]
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
            return context.db.employees.findAll();
        }
    }
}

module.exports.typeDefs = typeDefs;
module.exports.resolvers = resolvers;