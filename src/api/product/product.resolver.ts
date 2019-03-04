import { Product } from './product.model'
import { ProductController } from './product.controller'
import { pubsub } from '../app'

// constant for all product events
const EVENTS = {
    PRODUCT: {
        CREATED: 'PRODUCT_CREATED',
        UPDATED: 'PRODUCT_UPDATED',
        DELETED: 'PRODUCT_DELETED',
    },
}

/**
 * Implementation of the GraphQL-Schema of the product
 * every resolver-functions calls a controller-function, which contains the specific logic
 */
const productResolver = {
    Query: {
        /**
         * returns all products in the database.
         */
        products: async (parent, args, context) => {
            const products = await ProductController.products()
            return products
        },
        /**
         * return a specific product by id.
         */
        product: async (parent, { id }, { models }) => {
            const product = await ProductController.product(id)
            return product
        },
    },

    Mutation: {
        /**
         * creates a new product.
         */
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
            // triggers productCreated event and subscription
            await pubsub.publish(EVENTS.PRODUCT.CREATED, {
                productCreated: product,
            })

            return product
        },
        /**
         * deletes a product by id
         */
        deleteProduct: async (parent, { id }, { models }) => {
            const successful = await ProductController.deleteProduct(id)

            // triggers productDeleted event and subscription
            await pubsub.publish(EVENTS.PRODUCT.DELETED, {
                productDeleted: id,
            })
            return successful
        },
        /**
         * updates an existing product.
         */
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
            // triggers productUpdated event and subscription
            await pubsub.publish(EVENTS.PRODUCT.UPDATED, {
                productUpdated: product,
            })
            return product
        },
    },
    Subscription: {
        /**
         * subscription that triggers if a new product has been created.
         */
        productCreated: {
            subscribe: () => pubsub.asyncIterator([EVENTS.PRODUCT.CREATED]),
        },
        /**
         * subscription that triggers if product has been updated.
         */
        productUpdated: {
            subscribe: () => pubsub.asyncIterator([EVENTS.PRODUCT.UPDATED]),
        },
        /**
         * subscription that triggers if a product has been deleted.
         */
        productDeleted: {
            subscribe: () => pubsub.asyncIterator([EVENTS.PRODUCT.DELETED]),
        },
    },
    Product: {
        /**
         * returns all categories of product.
         */
        categories: async (product, { id }, { models }) => {
            const categories = await ProductController.categories(
                product.categories
            )
            return categories
        },
        /**
         * returns the image of a product.
         */
        img: async (product, { id }, { models }) => {
            const img = await ProductController.img(product.img)
            return img
        },
        /**
         * return the topics of a product.
         */
        topic: async (product, { id }, { models }) => {
            const topic = await ProductController.topic(product.topic)
            return topic
        },
    },
}

export { productResolver }
