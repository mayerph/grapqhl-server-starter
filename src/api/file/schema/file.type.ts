import { gql } from 'apollo-server-express'

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
