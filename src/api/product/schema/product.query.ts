import { gql } from 'apollo-server-express'

/**
 * GraphQL schema --> all queries related to the product.
 */
const productQuery = gql`
    extend type Query {
        products: [Product!]!
        product(id: ID!): Product!
    }
`

export { productQuery }
