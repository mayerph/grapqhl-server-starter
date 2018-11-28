import { Product } from '../../api/product/product.model'
import { Category } from '../../api/category/category.model'

const dropProducts = async () => {
    await Product.deleteMany({})
}

const createProducts = async () => {
    let skiProduct
    let snowboardProduct
    let skiShoeProduct

    skiProduct = await Product.findOne({ name: 'ground ski' })
    if (!skiProduct) {
        const skiCategory = await Category.findOne({ name: 'ski' })
        skiProduct = new Product({
            name: 'ground ski',
            description: 'ground ski',
            price: 10000,
            categories: [skiCategory],
            gender: 'MALE',
        })
        skiProduct.save()
    }

    snowboardProduct = await Product.findOne({ name: 'ground snowboard' })
    if (!skiProduct) {
        const skiCategory = await Category.findOne({ name: 'snowboard' })
        skiProduct = new Product({
            name: 'ground snowboard',
            description: 'ground snowboard',
            price: 10000,
            categories: [skiCategory],
            gender: 'MALE',
        })
        skiProduct.save()
    }

    skiShoeProduct = await Product.findOne({ name: 'ski-shoe' })
    if (!skiShoeProduct) {
        const skiCategory = await Category.findOne({ name: 'ski' })
        const equipmentCategory = await Category.findOne({ name: 'equipment' })
        skiShoeProduct = new Product({
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
