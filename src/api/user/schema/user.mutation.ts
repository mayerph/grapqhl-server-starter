import { gql } from 'apollo-server-express'

const userMutation = gql`
    scalar Upload

    extend type Mutation {
        signUp(username: String!, email: String!, password: String!): Token!
        signIn(username: String!, password: String!): Token!
        deleteUser(id: ID!): Boolean!
            @hasPermission(requiredPermission: deleteUser)

        createUser(
            username: String!
            email: String!
            role: ID!
            password: String!
            img: Upload
        ): User @hasPermission(requiredPermission: createUser)
        updateUser(
            id: ID!
            username: String
            password: String
            email: String
            role: ID
            img: Upload
            deleteImage: Boolean
        ): User @hasPermission(requiredPermission: updateUser)
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
//@hasPermission(requiredPermission: updateUser)
//@hasPermission(requiredPermission: deleteUser)
//@hasPermission(requiredPermission: createUser)
export { userMutation }
