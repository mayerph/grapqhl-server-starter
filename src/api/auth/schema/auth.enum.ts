import { gql } from 'apollo-server-express'

const authEnum = gql`
    enum UserPermission {
        adminUser
        deleteUser
        updateUser
        createUser
        deleteMessage
        updateMessage
        createMessage
        readPassword
    }
`

export { authEnum }
