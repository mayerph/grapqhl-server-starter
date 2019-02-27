import { authDirectives } from './schema/auth.directive'

/**
 * merge all graphql schema entries for authentication and authorization.
 */
const authSchema = [authDirectives]

/**
 * export the graphql schema for authentication and authorization.
 */
export { authSchema }
