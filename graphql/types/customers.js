const { gql } = require("apollo-server");

const typeDefs = gql`
    input FilterCustomer {
        customerNumber: ID
        customerName: String
        contactLastName: String
        contactFirstName: String
        phone: String
        addressLine1: String
        addressLine2: String
        city: String
        state: String
        postalCode: String
        country: String
        creditLimit: Float
    } 

    extend type Query {
        customers(filter: FilterCustomer, sort: [[String]], limit: Int, offset: Int) : [Customer]
    }

    type Customer {
        customerNumber: ID!
        customerName: String
        contactLastName: String
        contactFirstName: String
        phone: String
        addressLine1: String
        addressLine2: String
        city: String
        state: String
        postalCode: String
        country: String
        creditLimit: Float
    }
`;

const resolvers = {
    Query: {
        customers: (_, args, context, info) => {
            return context.db.customers.findAll({where: args.filter, order: args.sort, limit: args.limit, offset: args.offset});
        }
    }
}

module.exports.typeDefs = typeDefs;
module.exports.resolvers = resolvers;