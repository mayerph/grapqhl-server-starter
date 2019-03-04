import { userResolver } from './user'
import { permissionResolver } from './permission'
import { roleResolver } from './role'
import { categoryResolver } from './category'
import { productResolver } from './product'
import { topicResolver } from './topic'

/**
 * merges all resolver.
 */
const resolvers = [
    userResolver,
    permissionResolver,
    roleResolver,
    categoryResolver,
    productResolver,
    topicResolver,
]

export default resolvers
