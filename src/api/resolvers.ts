import { userResolver } from './user'
import { permissionResolver } from './permission'
import { roleResolver } from './role'

const resolvers = [userResolver, permissionResolver, roleResolver]

export default resolvers
