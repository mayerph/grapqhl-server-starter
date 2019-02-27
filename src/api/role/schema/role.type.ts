import { gql } from 'apollo-server-express'

/**
 * GraphQL schema --> all types related to the role.
 */
const roleType = gql`
    type Role {
        id: String!
        name: String!
        permissions: [Permission]
    }
`

export { roleType }
