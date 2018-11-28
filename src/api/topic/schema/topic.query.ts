import { gql } from 'apollo-server-express'

const topicQuery = gql`
    extend type Query {
        topics: [Topic!]!
        topic(id: ID!): Topic!
    }
`

export { topicQuery }
