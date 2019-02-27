import { gql } from 'apollo-server-express'

/**
 * GraphQL schema --> all queries related to the topic.
 */
const topicQuery = gql`
    extend type Query {
        topics: [Topic!]!
        topic(id: ID!): Topic!
    }
`

export { topicQuery }
