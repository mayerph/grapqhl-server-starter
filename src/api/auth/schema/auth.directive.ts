import { gql } from 'apollo-server-express'

const authDirectives = gql`
    directive @isAuth on FIELD | FIELD_DEFINITION
    directive @hasPermission(
        requiredPermission: UserPermission!
    ) on FIELD | FIELD_DEFINITION
    directive @isMessageOwner on FIELD | FIELD_DEFINITION
`

export { authDirectives }
