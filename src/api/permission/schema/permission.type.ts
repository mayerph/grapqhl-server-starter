import { gql } from 'apollo-server-express'

const permissionType = gql`
    type Permission {
        id: ID!
        name: String!
        description: String!
    }
`

export { permissionType }
