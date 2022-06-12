const { gql } = require("apollo-server");

const typeDefs = gql`
    input FilterProduct {
        productCode: ID
        productName: String
        productLine: String
        productScale: String
        productVendor: String
        productDescription: String
        quantityInStock: Int
        buyPrice: Float
        MSRP: Float
    } 

    extend type Query {
        products(filter: FilterProduct, sort: [[String]], limit: Int, offset: Int, search: Boolean) : [Product]
    }

    type Product {
        productCode: ID
        productName: String
        productLine: String
        productScale: String
        productVendor: String
        productDescription: String
        quantityInStock: Int
        buyPrice: Float
        MSRP: Float
        category: ProductLine
    }
`;

const resolvers = {
    Query: {
        products: (_, args, context, info) => {
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

            return context.db.products.findAll({where: filter, order: args.sort, limit: args.limit, offset: args.offset});
        }
    },
    Product: {
        category: (obj, args, context, info) => {
            return context.db.productlines.findByPk(obj.productLine);
        }
    }
}

module.exports.typeDefs = typeDefs;
module.exports.resolvers = resolvers;