import { gql } from 'apollo-server-express'

const fileType = gql`
    type File {
        id: String!
        name: String!
        mimeType: String!
        source: String!
    }
`

export { fileType }
