import { gql } from 'apollo-server-express'

const categoryQuery = gql`
    extend type Query {
        categories: [Category!]!
        category(id: ID!): Category!
    }
`

export { categoryQuery }
