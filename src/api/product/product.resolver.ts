import { Product } from './product.model'
import { ProductController } from './product.controller'

const productResolver = {
    Query: {
        products: async (parent, args, context) => {
            // await Product.deleteMany({})
            const products = await ProductController.products()
            return products
        },
        product: async (parent, { id }, { models }) => {
            const product = await ProductController.product(id)
            return product
        },
    },

    Mutation: {
        createProduct: async (
            parent,
            { name, description, price, categories, gender, img },
            context
        ) => {
            const product = await ProductController.createProduct(
                name,
                description,
                price,
                categories,
                gender,
                img
            )
            return product
        },

        deleteProduct: async (parent, { id }, { models }) => {
            const successful = await ProductController.deleteProduct(id)
            return successful
        },
        updateProduct: async (
            parent,
            { id, name, description, price, categories, gender, img },
            { models }
        ) => {
            const product = await ProductController.updateProduct(
                id,
                name,
                description,
                price,
                categories,
                gender,
                img
            )
            return product
        },
    },
    Product: {
        categories: async (product, { id }, { models }) => {
            const categories = await ProductController.categories(
                product.categories
            )
            return categories
        },
        img: async (product, { id }, { models }) => {
            const img = await ProductController.img(product.img)
            return img
        },
    },
}

export { productResolver }
