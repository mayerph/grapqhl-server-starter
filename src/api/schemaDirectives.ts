import { authSchemaDirective } from './auth/auth.schemaDirective'
import { merge } from 'lodash'

/**
 * merges all directive implementations.
 */
const schemaDirectives = merge(authSchemaDirective)

export default schemaDirectives
