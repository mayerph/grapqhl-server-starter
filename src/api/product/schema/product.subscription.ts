import { gql } from 'apollo-server-express'

const productSubscription = gql`
    extend type Subscription {
        productCreated: Product!
        productUpdated: Product!
        productDeleted: ID!
    }
`

export { productSubscription }
