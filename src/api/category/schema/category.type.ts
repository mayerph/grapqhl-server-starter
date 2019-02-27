import { gql } from 'apollo-server-express'

/**
 * GraphQL schema --> all types related to the category.
 */
const categoryType = gql`
    type Category {
        id: String!
        name: String!
        description: String
        products: [Product]
    }
`

export { categoryType }
