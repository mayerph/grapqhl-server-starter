import { gql } from 'apollo-server-express'

const templateQuery = gql`
    extend type Query {
        templates: [Template!]
    }
`

export { templateQuery }
