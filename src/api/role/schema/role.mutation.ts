import { gql } from 'apollo-server-express'

/**
 * GraphQL schema --> all mutations related to the role.
 */
const roleMutation = gql`
    extend type Mutation {
        createRole(name: String!, permissions: [ID]): Role!
        deleteRole(id: ID!): Boolean!
        updateRole(id: ID!, name: String, permissions: [ID]): Role!
    }
`

export { roleMutation }
