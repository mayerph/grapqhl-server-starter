import { gql } from 'apollo-server-express'

const roleType = gql`
    type Role {
        id: String!
        name: String!
        permissions: [Permission]
    }
`

export { roleType }
