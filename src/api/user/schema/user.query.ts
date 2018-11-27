import { gql } from 'apollo-server-express'

const userQuery = gql`
    extend type Query {
        users: [User!] @hasPermission(requiredPermission: createUser)
        user(id: ID!): User @hasPermission(requiredPermission: createUser)
        me: User
    }
`

export { userQuery }
