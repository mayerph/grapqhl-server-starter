import { gql } from 'apollo-server-express'

/**
 * GraphQL schema --> all enums related to the category.
 */
const genderEnum = gql`
    enum Gender {
        MALE
        FEMALE
        UNISEX
    }
`

export { genderEnum }
