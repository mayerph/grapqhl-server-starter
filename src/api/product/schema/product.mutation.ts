import { gql } from 'apollo-server-express'

const productMutation = gql`
    extend type Mutation {
        createProduct(
            name: String!
            description: String!
            price: Int!
            categories: [Int]
            gender: Gender
            img: Upload
        ): Product!
        deleteProduct(id: ID!): Boolean!
        updateProduct(
            id: ID!
            name: String
            description: String
            price: Int
            categories: [Int]
            gender: Gender
            img: Upload
        ): Product!
    }
`

export { productMutation }
