import { gql } from 'apollo-server-express'

/**
 * GraphQL schema --> all queries related to the category.
 */
const categoryQuery = gql`
    extend type Query {
        categories: [Category!]!
        category(id: ID!): Category!
    }
`

export { categoryQuery }
