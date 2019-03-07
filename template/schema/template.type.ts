import { gql } from 'apollo-server-express'

const templateType = gql`
    type Template {
        id: ID!
        name: String!
        description: String!
    }
`

export { templateType }
