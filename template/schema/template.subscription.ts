import { gql } from 'apollo-server-express'

const templateSubscription = gql`
    extend type Subscription {
        templateCreated: Template!
    }
`

export { templateSubscription }
