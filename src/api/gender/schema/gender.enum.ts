import { gql } from 'apollo-server-express'

const genderEnum = gql`
    enum Gender {
        MALE
        FEMALE
        UNISEX
    }
`

export { genderEnum }
