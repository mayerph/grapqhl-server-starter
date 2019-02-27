import { gql } from 'apollo-server-express'

/**
 * GraphQL schema --> all mutations related to the topic.
 */
const topicMutation = gql`
    extend type Mutation {
        createTopic(name: String!, description: String): Topic!
        deleteTopic(id: ID!): Boolean!
        updateTopic(id: ID!, name: String, description: String): Topic!
    }
`

export { topicMutation }
