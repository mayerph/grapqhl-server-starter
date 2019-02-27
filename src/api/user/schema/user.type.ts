import { gql } from 'apollo-server-express'

/**
 * GraphQL schema --> all types related to the user.
 */
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

export { userType }
