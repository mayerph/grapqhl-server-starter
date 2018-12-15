import { gql } from 'apollo-server-express'

const userType = gql`
    type Token {
        token: String!
    }

    type User {
        id: String!
        username: String!
        password: String!
        email: String!
        role: Role
        img: File
    }
`
// @hasPermission(requiredPermission: readPassword)
export { userType }
