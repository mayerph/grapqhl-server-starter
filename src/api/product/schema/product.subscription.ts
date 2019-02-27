import { gql } from 'apollo-server-express'

/**
 * GraphQL schema --> all subscriptions related to the product.
 */
const productSubscription = gql`
    extend type Subscription {
        productCreated: Product!
        productUpdated: Product!
        productDeleted: ID!
    }
`

export { productSubscription }
