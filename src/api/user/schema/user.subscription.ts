import { gql } from 'apollo-server-express'

/**
 * GraphQL schema --> all subscriptions related to the user.
 */
const userSubscription = gql`
    extend type Subscription {
        userCreated: User!
        userUpdated: User!
        userDeleted: ID
    }
`

export { userSubscription }
