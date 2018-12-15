import { gql } from 'apollo-server-express'

const userQuery = gql`
    extend type Query {
        users: [User!] @hasPermission(requiredPermission: adminUser)
        user(id: ID!): User @hasPermission(requiredPermission: adminUser)
        me: User
    }
`

export { userQuery }

//@hasPermission(requiredPermission: createUser)
