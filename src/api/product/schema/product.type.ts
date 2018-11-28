import { gql } from 'apollo-server-express'

const productType = gql`
    type Product {
        id: String!
        name: String!
        description: String!
        price: Int
        categories: [Category]
        gender: Gender
        img: File
    }
`

export { productType }
