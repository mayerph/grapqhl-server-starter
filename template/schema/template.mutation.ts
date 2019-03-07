import { gql } from 'apollo-server-express'

const templateMutation = gql`
    extend type Mutation {
        createTemplate(name: String!, description: String!): Template!
    }
`
export { templateMutation }
