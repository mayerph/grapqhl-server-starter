import { authEnum } from './schema'
import { authDirectives } from './schema/auth.directive'

const authSchema = [authDirectives, authEnum]
export { authSchema }
