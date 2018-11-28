import { userResolver } from './user'
import { permissionResolver } from './permission'
import { roleResolver } from './role'
import { categoryResolver } from './category'
import { productResolver } from './product'

const resolvers = [
    userResolver,
    permissionResolver,
    roleResolver,
    categoryResolver,
    productResolver,
]

export default resolvers
