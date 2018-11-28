import { gql } from 'apollo-server-express'

const productSubscription = gql`
    extend type Subscription {
        productCreated: User!
        productUpdated: User!
        productDeleted: ID!
    }
`

export { productSubscription }
