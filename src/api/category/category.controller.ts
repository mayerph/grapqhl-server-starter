import { Category } from './category.model'
import { Product } from '../product/product.model'

/**
 * Implements all logic related to a user.
 */
const CategoryController = {
    /**
     * returns all categories in the database.
     */
    categories: async () => {
        const categories = await Category.find({}).exec()
        return categories
    },

    /**
     * returns a specific category by id.
     * @param {string} id - id of the category
     */
    category: async (id: string) => {
        const category = await Category.findById(id).exec()
        return category
    },

    /**
     * creates a new category.
     * @param {string} name - name of the category
     * @param {string } description - description of the category
     */
    createCategory: async (name: string, description: string) => {
        const category = new Category({
            name,
            description,
        })

        await category.save()

        return category
    },

    /**
     * deletes specific category by id.
     * @param {string} id - id of the category
     */
    deleteCategory: async (id: string) => {
        await Category.remove({ _id: id }).exec()
        return true
    },

    /**
     * updates specific category by id.
     * @param {string} id - id of the category
     * @param {string} name - name of the category
     * @param {string} description - description of the category
     */
    updateCategory: async (id: string, name: string, description: string) => {
        const category = await Category.findById(id).exec()
        if (name) {
            category.name = name
        }
        if (description) {
            category.description = description
        }
        await category.save()
        return category
    },

    /**
     * returns products of a specific category.
     * @param {string} id - id of the category
     */
    products: async (id: string) => {
        const products = await Product.find({ categories: id }).exec()
        return products
    },
}

export { CategoryController }
