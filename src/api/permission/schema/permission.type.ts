import { gql } from 'apollo-server-express'

/**
 * GraphQL schema --> all types related to the permission.
 */
const permissionType = gql`
    type Permission {
        id: ID!
        name: String!
        description: String!
    }
`

export { permissionType }
