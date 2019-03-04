import { Product } from '../../api/product/product.model'
import { Category } from '../../api/category/category.model'
import { Topic } from '../../api/topic/topic.model'

/**
 * drops all products in the database.
 */
const dropProducts = async () => {
    await Product.deleteMany({})
}

/**
 * creates the default products in the database.
 */
const createProducts = async () => {
    let skiProduct
    let snowboardProduct
    let skiShoeProduct

    skiProduct = await Product.findOne({ name: 'ground ski' })
    if (!skiProduct) {
        // category
        const skiCategory = await Category.findOne({ name: 'ski' })

        // topic
        const skiTopic = await Topic.findOne({ name: 'ski' })

        skiProduct = new Product({
            topic: [skiTopic],
            name: 'ground ski',
            description: 'ground ski',
            price: 10000,
            categories: [skiCategory],
            gender: 'MALE',
        })
        skiProduct.save()
    }

    snowboardProduct = await Product.findOne({ name: 'ground snowboard' })
    if (!snowboardProduct) {
        // category
        const snowboardCategory = await Category.findOne({ name: 'snowboard' })

        // topic
        const snowboardTopic = await Topic.findOne({ name: 'snowboard' })

        snowboardProduct = new Product({
            topic: [snowboardTopic],
            name: 'ground snowboard',
            description: 'ground snowboard',
            price: 10000,
            categories: [snowboardCategory],
            gender: 'MALE',
        })
        snowboardProduct.save()
    }

    skiShoeProduct = await Product.findOne({ name: 'ski-shoe' })
    if (!skiShoeProduct) {
        // categories
        const skiCategory = await Category.findOne({ name: 'ski' })
        const equipmentCategory = await Category.findOne({ name: 'equipment' })

        // topic
        const skiTopic = await Topic.findOne({ name: 'ski' })
        skiShoeProduct = new Product({
            topic: [skiTopic],
            name: 'ski-shoe',
            description: 'ski-shoe',
            price: 10000,
            categories: [skiCategory, equipmentCategory],
            gender: 'MALE',
        })
        skiShoeProduct.save()
    }
}

export { createProducts, dropProducts }
