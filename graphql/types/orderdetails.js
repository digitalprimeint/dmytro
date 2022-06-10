const { gql } = require("apollo-server");

const typeDefs = gql`
    input FilterOrderDetail {
        orderNumber: ID
        productCode: String
        quantityOrdered: Int
        priceEach: Float
        orderLineNumber: Int
    } 

    extend type Query {
        orderdetails(filter: FilterOrder, sort: [[String]], limit: Int, offset: Int) : [OrderDetail]
    }

    type OrderDetail {
        orderNumber: ID!
        productCode: String
        quantityOrdered: Int
        priceEach: Float
        orderLineNumber: Int
        order: Order
        products: [Product]
    }
`;

const resolvers = {
    Query: {
        orderdetails: (_, args, context, info) => {
            return context.db.orderdetails.findAll({where: args.filter, order: args.sort, limit: args.limit, offset: args.offset});
        }
    },
    OrderDetail: {
        order: (obj, args, context, info) => {
            return context.db.orders.findByPk(obj.orderNumber);
        },
        products: (obj, args, context, info) => {
            return context.db.products.findAll({ where: { productCode: obj.productCode }});
        }
    }
}

module.exports.typeDefs = typeDefs;
module.exports.resolvers = resolvers;