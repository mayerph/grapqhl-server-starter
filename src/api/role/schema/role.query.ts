import { gql } from 'apollo-server-express'

const roleQuery = gql`
    extend type Query {
        roles: [Role!]
        role(id: ID!): Role
    }
`

export { roleQuery }
