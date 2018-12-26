import { gql } from 'apollo-server-express'

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
