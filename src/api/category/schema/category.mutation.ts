import { gql } from 'apollo-server-express'

/**
 * GraphQL schema --> all mutations related to the category.
 */
const categoryMutation = gql`
    extend type Mutation {
        createCategory(name: String!, description: String): Category!
        deleteCategory(id: ID!): Boolean!
        updateCategory(id: ID!, name: String, description: String): Category!
    }
`

export { categoryMutation }
