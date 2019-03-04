import { Product } from './product.model'
import { FileController } from '../file/file.controller'
import { CategoryController } from '../category/category.controller'
import { TopicController } from '../topic/topic.controller'

const pictureName = 'images/user/productImage'

/**
 * Implements all logic related to a product.
 */
const ProductController = {
    /**
     * returns all products in the database.
     */
    products: async () => {
        const products = await Product.find({})
        return products
    },

    /**
     * returns a specific permission by id.
     * @param id - id of the permission
     */
    product: async (id: string) => {
        const product = await Product.findById(id)
        return product
    },

    /**
     * creates a new permission.
     * @param topicNames - topic of the product
     * @param stock - stock of the product
     * @param name - name of the product
     * @param description - description of the product
     * @param price - price of the product
     * @param categories - categories of the product
     * @param gender - gendering product
     * @param productImage - image of the product
     */
    createProduct: async (
        topicNames: string[],
        stock: number,
        name: string,
        description: string,
        price: number,
        categories: number[],
        gender: string,
        productImage: any
    ) => {
        let img
        if (productImage) {
            img = await FileController.createImageFile(
                pictureName,
                productImage
            )
            img.save()
        }
        const topic = ProductController.topicByName(topicNames)
        const product = new Product({
            topic,
            stock,
            name,
            description,
            price,
            categories,
            gender,
            img,
        })

        await product.save()

        return product
    },
    /**
     * deletes product by id.
     * @param id of the product
     */
    deleteProduct: async (id: string) => {
        await Product.remove({ _id: id })
        return true
    },
    /**
     * updates an existing product.
     * @param id - id of the product
     * @param topicNames - topic of the product
     * @param stock - stock of the product
     * @param name - name of the product
     * @param description - description of the product
     * @param price - price of the product
     * @param categories - categories of the product
     * @param gender - gendering product
     * @param productImage - image of the product
     */
    updateProduct: async (
        id: string,
        topicNames: string[],
        stock: number,
        name: string,
        description: string,
        price: number,
        categories: number[],
        gender: string,
        productImage: any
    ) => {
        const product = await Product.findById(id)
        if (topicNames) {
            const topic = ProductController.topicByName(topicNames)
            product.topic = topic
        }
        if (stock) {
            product.stock = stock
        }
        if (name) {
            product.name = name
        }
        if (description) {
            product.description = description
        }
        if (price) {
            product.price = price
        }
        if (categories) {
            product.categories = categories
        }
        if (gender) {
            product.gender = gender
        }
        if (productImage) {
            const img = await FileController.createImageFile(
                pictureName,
                productImage
            )

            product.img = img
        }
        await product.save()
        return product
    },
    /**
     * returns the categories of a product.
     * @param categoryIds - ids of the categories
     */
    categories: async (categoryIds: number[]) => {
        if (!categoryIds) {
            return null
        }
        const categories = categoryIds.map(async (e: any) => {
            const category = await CategoryController.category(e)
            return category
        })
        await Promise.all(categories)
        return categories
    },
    /**
     * returns the image a product.
     * @param imgId - id of the image
     */
    img: async (imgId: string) => {
        const img = await FileController.file(imgId)
        return img
    },

    /**
     * returns the topics of a product.
     * @param topicIds - ids of the topics
     */
    topic: async (topicIds: number[]) => {
        if (!topicIds) {
            return null
        }
        const topics = topicIds.map(async (e: any) => {
            const topic = await TopicController.topic(e)
            return topic
        })
        await Promise.all(topics)
        return topics
    },
    /**
     * returns the topics by name.
     * @param topicName - topic names
     */
    topicByName: async (topicNames: string[]) => {
        if (!topicNames) {
            return null
        }
        const topics = topicNames.map(async (e: any) => {
            const topic = await TopicController.topicByName(e)
            return topic
        })
        await Promise.all(topics)
        return topics
    },
}

export { ProductController }
