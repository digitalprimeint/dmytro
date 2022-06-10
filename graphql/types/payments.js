const { gql } = require("apollo-server");

const typeDefs = gql`
    input FilterPayment {
        customerNumber: Int
        checkNumber: String
        paymentDate: String
        amount: Float
    } 

    extend type Query {
        payments(filter: FilterPayment, sort: [[String]], limit: Int, offset: Int) : [Payment]
    }

    type Payment {
        customerNumber: String
        checkNumber: String
        paymentDate: String
        amount: Float
        customer: Customer
    }
`;

const resolvers = {
    Query: {
        payments: (_, args, context, info) => {
            return context.db.payments.findAll({where: args.filter, order: args.sort, limit: args.limit, offset: args.offset});
        }
    },
    Payment: {
        customer: (obj, args, context, info) => {
            return context.db.customers.findByPk(obj.customerNumber);
        }
    }
}

module.exports.typeDefs = typeDefs;
module.exports.resolvers = resolvers;