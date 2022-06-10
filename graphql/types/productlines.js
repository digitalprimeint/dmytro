const { gql } = require("apollo-server");

const typeDefs = gql`
    input FilterProductLine {
        productLine: ID
        textDescription: String
    } 

    extend type Query {
        productlines(filter: FilterProductLine, sort: [[String]], limit: Int, offset: Int) : [ProductLine]
    }

    type ProductLine {
        productLine: ID!
        textDescription: String
    }
`;

const resolvers = {
    Query: {
        productlines: (_, args, context, info) => {
            return context.db.productlines.findAll({where: args.filter, order: args.sort, limit: args.limit, offset: args.offset});
        }
    }
}

module.exports.typeDefs = typeDefs;
module.exports.resolvers = resolvers;