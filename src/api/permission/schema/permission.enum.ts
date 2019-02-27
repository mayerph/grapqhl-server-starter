import { gql } from 'apollo-server-express'

/**
 * GraphQL schema --> all enums related to the permission.
 */
const permissionEnum = gql`
    enum UserPermission {
        adminUser
        adminDefault
        readDefault
        deleteUser
        updateUser
        createUser
        deleteMessage
        updateMessage
        createMessage
        readPassword
    }
`

export { permissionEnum }
