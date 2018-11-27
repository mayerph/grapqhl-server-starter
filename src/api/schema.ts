import { userSchema } from './user'
import { authSchema } from './auth'
import { permissionSchema } from './permission'
import { roleSchema } from './role'
import { fileSchema } from './file'
import { gql } from 'apollo-server-express'

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

const schemas = [linkSchema].concat(
    userSchema,
    authSchema,
    permissionSchema,
    roleSchema,
    fileSchema
)

export default schemas
