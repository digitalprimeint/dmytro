const { gql } = require("apollo-server");

const typeDefs = gql`
    input FilterProductLine {
        productLine: ID
        textDescription: String
    } 

    extend type Query {
        productlines(filter: FilterProductLine, sort: [[String]], limit: Int, offset: Int, search: Boolean) : [ProductLine]
    }

    type ProductLine {
        productLine: ID!
        textDescription: String
    }
`;

const resolvers = {
    Query: {
        productlines: (_, args, context, info) => {
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

            return context.db.productlines.findAll({where: filter, order: args.sort, limit: args.limit, offset: args.offset});
        }
    }
}

module.exports.typeDefs = typeDefs;
module.exports.resolvers = resolvers;