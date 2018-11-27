import { gql } from 'apollo-server-express'

const permissionType = gql`
    type Permission {
        id: String!
        name: String!
        description: String!
    }
`

export { permissionType }
