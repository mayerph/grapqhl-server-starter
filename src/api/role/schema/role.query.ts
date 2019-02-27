import { gql } from 'apollo-server-express'

/**
 * GraphQL schema --> all queries related to the role.
 */
const roleQuery = gql`
    extend type Query {
        roles: [Role!]
        role(id: ID!): Role
    }
`

export { roleQuery }
