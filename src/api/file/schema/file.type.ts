import { gql } from 'apollo-server-express'

/**
 * GraphQL schema --> all types related to a file.
 */
const fileType = gql`
    scalar Upload

    type File {
        id: String!
        name: String!
        mimeType: String!
        source: String!
    }
`

export { fileType }
