import { gql } from 'apollo-server-express'

const templateSubscription = gql`
    extend type Subscription {
        
    }
`

export { templateSubscription }
