import { Product } from './product.model'
import { ProductController } from './product.controller'
import { pubsub } from '../app'

const EVENTS = {
    PRODUCT: {
        CREATED: 'PRODUCT_CREATED',
        UPDATED: 'PRODUCT_UPDATED',
        DELETED: 'PRODUCT_DELETED',
    },
}

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
            { topic, stock, name, description, price, categories, gender, img },
            context
        ) => {
            const product = await ProductController.createProduct(
                topic,
                stock,
                name,
                description,
                price,
                categories,
                gender,
                img
            )
            await pubsub.publish(EVENTS.PRODUCT.CREATED, {
                productCreated: product,
            })

            return product
        },

        deleteProduct: async (parent, { id }, { models }) => {
            const successful = await ProductController.deleteProduct(id)
            await pubsub.publish(EVENTS.PRODUCT.DELETED, {
                productDeleted: id,
            })
            return successful
        },
        updateProduct: async (
            parent,
            {
                id,
                topic,
                stock,
                name,
                description,
                price,
                categories,
                gender,
                img,
            },
            { models }
        ) => {
            const product = await ProductController.updateProduct(
                id,
                topic,
                stock,
                name,
                description,
                price,
                categories,
                gender,
                img
            )

            await pubsub.publish(EVENTS.PRODUCT.UPDATED, {
                productUpdated: product,
            })
            return product
        },
    },
    Subscription: {
        userCreated: {
            subscribe: () => pubsub.asyncIterator([EVENTS.PRODUCT.CREATED]),
        },
        userUpdated: {
            subscribe: () => pubsub.asyncIterator([EVENTS.PRODUCT.UPDATED]),
        },
        userDeleted: {
            subscribe: () => pubsub.asyncIterator([EVENTS.PRODUCT.DELETED]),
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
        topic: async (product, { id }, { models }) => {
            const topic = await ProductController.topic(product.topic)
            return topic
        },
    },
}

export { productResolver }
