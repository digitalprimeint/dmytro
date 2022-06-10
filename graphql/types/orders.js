const { gql } = require("apollo-server");

const typeDefs = gql`
    input FilterOrder {
        orderNumber: ID
        orderDate: String
        requiredDate: String
        shippedDate: String
        status: String
        comments: String
        customerNumber: String
    } 

    extend type Query {
        orders(filter: FilterOrder, sort: [[String]], limit: Int, offset: Int) : [Order]
    }

    type Order {
        orderNumber: ID!
        orderDate: String
        requiredDate: String
        shippedDate: String
        status: String
        comments: String
        customerNumber: String
        customer: Customer
        orderdetails: [OrderDetail]
    }
`;

const resolvers = {
    Query: {
        orders: (_, args, context, info) => {
            return context.db.orders.findAll({where: args.filter, order: args.sort, limit: args.limit, offset: args.offset});
        }
    },
    Order: {
        customer: (obj, args, context, info) => {
            return context.db.customers.findByPk(obj.customerNumber);
        },
        orderdetails: (obj, args, context, info) => {
            return context.db.orderdetails.findAll({ where: { orderNumber: obj.orderNumber }});
        }
    }
}

module.exports.typeDefs = typeDefs;
module.exports.resolvers = resolvers;