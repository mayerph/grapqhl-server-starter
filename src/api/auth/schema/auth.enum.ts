import { gql } from 'apollo-server-express';

const authEnum = gql`
    enum UserPermission {
        deleteUser
        updateUser
        createUser
        deleteMessage
        updateMessage
        createMessage
        readPassword
    }
`;

export { authEnum }