import { Product } from './product.model'
import { FileController } from '../file/file.controller'
import { CategoryController } from '../category/category.controller'
import { TopicController } from '../topic/topic.controller'

const pictureName = 'images/user/productImage'

const ProductController = {
    products: async () => {
        // await Product.deleteMany({})
        const products = await Product.find({})
        return products
    },
    product: async (id: string) => {
        const product = await Product.findById(id)
        return product
    },
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
    deleteProduct: async (id: string) => {
        await Product.remove({ _id: id })
        return true
    },
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
            // toDo
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
    img: async (imgId: string) => {
        const img = await FileController.file(imgId)
        return img
    },
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
