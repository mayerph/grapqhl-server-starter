import {
    IsAuthDirective,
    HasPermissionDirective,
    MessageOwnerDirective,
} from './schemaDirectives'

/**
 * create an object for all directive implementations
 * syntax: <name of the directive>: <name of the class>
 */
const authSchemaDirective = {
    isAuth: IsAuthDirective,
    hasPermission: HasPermissionDirective,
    isMessageOwner: MessageOwnerDirective,
}

export { authSchemaDirective }
