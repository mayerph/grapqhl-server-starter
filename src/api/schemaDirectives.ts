import { authSchemaDirective } from './auth/auth.schemaDirective'
import { merge } from 'lodash'

const schemaDirectives = merge(authSchemaDirective)

export default schemaDirectives
