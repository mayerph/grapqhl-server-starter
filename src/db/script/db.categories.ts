import { Category } from '../../api/category/category.model'

/**
 * drops all categories in the database.
 */
const dropCategories = async () => {
    await Category.deleteMany({}).exec()
}

/**
 * creates default categories in the database.
 */
const createCategories = async () => {
    let skiCategory
    let snowboardCategory
    let wearCategory
    let equipmentCategory
    let accessoriesCategory

    accessoriesCategory = await Category.findOne({ name: 'accessories' }).exec()
    if (!accessoriesCategory) {
        accessoriesCategory = new Category({
            name: 'accessories',
            description: 'accessories',
        })
        accessoriesCategory.save()
    }

    equipmentCategory = await Category.findOne({ name: 'equipment' }).exec()
    if (!equipmentCategory) {
        equipmentCategory = new Category({
            name: 'equipment',
            description: 'equipment',
        })
        equipmentCategory.save()
    }

    wearCategory = await Category.findOne({ name: 'wear' }).exec()
    if (!wearCategory) {
        wearCategory = new Category({
            name: 'wear',
            description: 'wear',
        })
        wearCategory.save()
    }

    snowboardCategory = await Category.findOne({ name: 'snowboard' }).exec()
    if (!snowboardCategory) {
        snowboardCategory = new Category({
            name: 'snowboard',
            description: 'snowboard',
        })
        snowboardCategory.save()
    }

    skiCategory = await Category.findOne({ name: 'ski' }).exec()
    if (!skiCategory) {
        skiCategory = new Category({
            name: 'ski',
            description: 'ski',
        })
        skiCategory.save()
    }
}

export { createCategories, dropCategories }
