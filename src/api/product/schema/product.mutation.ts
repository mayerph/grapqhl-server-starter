import { gql } from 'apollo-server-express'

const productMutation = gql`
    extend type Mutation {
        createProduct(
            topic: [String!]
            stock: Int
            name: String!
            description: String!
            price: Int!
            categories: [Int]
            gender: Gender
            img: Upload
        ): Product!
        deleteProduct(id: ID!): Boolean!
        updateProduct(
            topic: [String!]
            stock: Int
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
