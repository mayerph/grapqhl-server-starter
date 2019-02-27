import { gql } from 'apollo-server-express'

/**
 * GraphQL schema --> all queries related to the permission.
 */
const permissionQuery = gql`
    extend type Query {
        permissions: [Permission!]
        permission(id: ID!): Permission
    }
`

export { permissionQuery }
