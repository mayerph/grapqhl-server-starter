import { gql } from 'apollo-server-express'

const permissionQuery = gql`
    extend type Query {
        permissions: [Permission!]
        permission(id: ID!): Permission
    }
`

export { permissionQuery }
