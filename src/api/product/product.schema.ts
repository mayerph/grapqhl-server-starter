import {
    productType,
    productQuery,
    productMutation,
    productSubscription,
} from './schema'

/**
 * merges all graphql schema entries of the product
 */
const productSchema = [
    productType,
    productQuery,
    productMutation,
    productSubscription,
]

export { productSchema }
