import { roleType, roleQuery, roleMutation } from './schema'

/**
 * merges all graphql schema entries of the role
 */
const roleSchema = [roleType, roleQuery, roleMutation]

export { roleSchema }
