import { gql } from 'apollo-server-express'

/**
 * GraphQL schema --> all mutations related to the user.
 */
const userMutation = gql`
    extend type Mutation {
        signUp(username: String!, email: String!, password: String!): Token!
        signIn(username: String!, password: String!): Token!
        deleteUser(id: ID!): Boolean!
            @hasPermission(requiredPermission: adminDefault)

        createUser(
            username: String!
            email: String!
            role: ID!
            password: String!
            img: Upload
        ): User @hasPermission(requiredPermission: adminDefault)
        updateUser(
            id: ID!
            username: String
            password: String
            email: String
            role: ID
            img: Upload
            deleteImage: Boolean
        ): User @hasPermission(requiredPermission: adminDefault)
        updateMe(
            username: String
            password: String
            email: String
            role: ID
            img: Upload
            deleteImage: Boolean
        ): User @hasPermission(requiredPermission: readDefault)
    }
`
export { userMutation }
