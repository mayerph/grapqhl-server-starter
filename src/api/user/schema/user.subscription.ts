import { gql } from 'apollo-server-express'

const userSubscription = gql`
    extend type Subscription {
        userCreated: User!
        userUpdated: User!
        userDeleted: ID
    }
`

export { userSubscription }
