import { gql } from 'apollo-server-express'

/**
 * GraphQL schema --> all types related to the topic.
 */
const topicType = gql`
    type Topic {
        id: String!
        name: String!
        description: String
        products: [Product]
    }
`

export { topicType }
