import { userSchema } from './user'
import { authSchema } from './auth'
import { permissionSchema } from './permission'
import { roleSchema } from './role'
import { fileSchema } from './file'
import { categorySchema } from './category'
import { genderSchema } from './gender'
import { gql } from 'apollo-server-express'
import { productSchema } from './product'
import { topicSchema } from './topic'

/**
 * entry point for the merge.
 */
const linkSchema = gql`
    type Query {
        _: Boolean
    }
    type Mutation {
        _: Boolean
    }
    type Subscription {
        _: Boolean
    }
`

/**
 * merges all schemes.
 */
const schemas = [linkSchema].concat(
    userSchema,
    authSchema,
    permissionSchema,
    roleSchema,
    fileSchema,
    categorySchema,
    genderSchema,
    productSchema,
    topicSchema
)

export default schemas
