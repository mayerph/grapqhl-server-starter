import { gql } from 'apollo-server-express'

const categoryType = gql`
    type Category {
        id: String!
        name: String!
        description: String
        products: [Product]
    }
`

export { categoryType }
