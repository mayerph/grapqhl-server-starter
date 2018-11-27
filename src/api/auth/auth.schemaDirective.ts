import {
    IsAuthDirective,
    HasPermissionDirective,
    MessageOwnerDirective,
} from './schemaDirectives'

const authSchemaDirective = {
    isAuth: IsAuthDirective,
    hasPermission: HasPermissionDirective,
    isMessageOwner: MessageOwnerDirective,
}

export { authSchemaDirective }
