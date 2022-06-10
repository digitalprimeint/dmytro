const { ApolloServer, gql } = require("apollo-server");
require('dotenv').config();
const db = require("./database");

const server = new ApolloServer({
    modules: [
        require("./types/employees"),
        require("./types/customers"),
        require("./types/payments"),
        require("./types/orders"),
        require("./types/orderdetails"),
        require("./types/products"),
        require("./types/productlines")
    ],
    context: () => {
        return {
            db: db
        }
    }
});

server.listen().then(({url}) => console.log(`Server running on ${url}`)).catch(error => console.log(error));