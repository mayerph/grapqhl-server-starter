import { CategoryController } from './category.controller'

/**
 * Implementation of the GraphQL-Schema of the category
 * every resolver-functions calls a controller-function, which contains the specific logic
 */
const categoryResolver = {
    Query: {
        /**
         * returns all categories in the database.
         */
        categories: async (parent, args, context) => {
            const categories = await CategoryController.categories()
            return categories
        },
        /**
         * returns a specific category by id.
         */
        category: async (parent, { id }, { models }) => {
            const category = await CategoryController.category(id)
            return category
        },
    },

    Mutation: {
        /**
         * creates a new category.
         */
        createCategory: async (parent, { name, description }, context) => {
            const category = await CategoryController.createCategory(
                name,
                description
            )
            return category
        },
        /**
         * deletes specific category by id.
         */
        deleteCategory: async (parent, { id }, { models }) => {
            const successful = await CategoryController.deleteCategory(id)
            return successful
        },
        /**
         * updates specific category by id.
         */
        updateCategory: async (
            parent,
            { id, name, description },
            { models }
        ) => {
            const category = await CategoryController.updateCategory(
                id,
                name,
                description
            )
            return category
        },
    },
    /**
     * returns products of a specific category.
     */
    Category: {
        products: async (category, args, context) => {
            const products = await CategoryController.products(category.id)
            return products
        },
    },
}

export { categoryResolver }
