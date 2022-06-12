const { gql } = require("apollo-server");

const typeDefs = gql`
    input FilterPayment {
        customerNumber: Int
        checkNumber: String
        paymentDate: String
        amount: Float
    } 

    extend type Query {
        payments(filter: FilterPayment, sort: [[String]], limit: Int, offset: Int, search: Boolean) : [Payment]
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

            return context.db.payments.findAll({where: filter, order: args.sort, limit: args.limit, offset: args.offset});
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