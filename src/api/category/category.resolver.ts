import { Category } from './category.model'
import { CategoryController } from './category.controller'

const categoryResolver = {
    Query: {
        categories: async (parent, args, context) => {
            const categories = await CategoryController.categories()
            return categories
        },
        category: async (parent, { id }, { models }) => {
            const category = await CategoryController.category(id)
            return category
        },
    },

    Mutation: {
        createCategory: async (parent, { name, description }, context) => {
            const category = await CategoryController.createCategory(
                name,
                description
            )
            return category
        },

        deleteCategory: async (parent, { id }, { models }) => {
            const successful = await CategoryController.deleteCategory(id)
            return successful
        },
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
}

export { categoryResolver }
