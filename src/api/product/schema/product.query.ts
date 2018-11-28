import { gql } from 'apollo-server-express'

const productQuery = gql`
    extend type Query {
        products: [Product!]!
        product(id: ID!): Product!
    }
`

export { productQuery }
