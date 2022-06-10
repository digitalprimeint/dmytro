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
        salesRepEmployeeNumber: Int
        employee: Employee
        payments: [Payment]
        orders: [Order]
    }
`;

const resolvers = {
    Query: {
        customers: (_, args, context, info) => {
            return context.db.customers.findAll({where: args.filter, order: args.sort, limit: args.limit, offset: args.offset});
        }
    },
    Customer: {
        employee: (obj, args, context, info) => {
            return context.db.employees.findByPk(obj.salesRepEmployeeNumber);
        },
        payments: (obj, args, context, info) => {
            return context.db.payments.findAll({ where: { customerNumber: obj.customerNumber }});
        },
        orders: (obj, args, context, info) => {
            return context.db.orders.findAll({ where: { customerNumber: obj.customerNumber }});
        }
    }
}

module.exports.typeDefs = typeDefs;
module.exports.resolvers = resolvers;