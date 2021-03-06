import { gql } from 'apollo-server-express'

/**
 * GraphQL schema --> all mutations related to the permission.
 */
const permissionMutation = gql`
    extend type Mutation {
        createPermission(name: String!, description: String!): Permission!
        deletePermission(id: ID!): Boolean!
        updatePermission(
            id: ID!
            name: String
            description: [String]
        ): Permission!
    }
`

export { permissionMutation }
