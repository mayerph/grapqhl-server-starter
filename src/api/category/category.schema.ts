import { categoryType, categoryQuery, categoryMutation } from './schema'

/**
 * merges all graphql schema entries of the category
 */
const categorySchema = [categoryType, categoryQuery, categoryMutation]

export { categorySchema }
