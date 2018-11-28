import { gql } from 'apollo-server-express'

const topicType = gql`
    type Topic {
        id: String!
        name: String!
        description: String
        products: [Product]
    }
`

export { topicType }
