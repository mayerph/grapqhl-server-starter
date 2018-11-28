import { Category } from './category.model'
import { Product } from '../product/product.model'

const CategoryController = {
    categories: async () => {
        const categories = await Category.find({})
        return categories
    },
    category: async (id: string) => {
        const category = await Category.findById(id)
        return category
    },
    createCategory: async (name: string, description: string) => {
        const category = new Category({
            name,
            description,
        })

        await category.save()

        return category
    },
    deleteCategory: async (id: string) => {
        await Category.remove({ _id: id })
        return true
    },
    updateCategory: async (id: string, name: string, description: string) => {
        const category = await Category.findById(id)
        if (name) {
            category.name = name
        }
        if (description) {
            category.description = description
        }
        await category.save()
        return category
    },
    products: async (id: string) => {
        const products = await Product.find({ categories: id })
        return products
    },
}

export { CategoryController }
