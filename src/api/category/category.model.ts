import mongoose from 'mongoose'
import { ICategory, ICategoryModel } from './category.interface'

const Schema = mongoose.Schema

/**
 * interface of the mongoose-schema
 * can be used to define properties and non-static methods
 */
interface ICategoryMongoose extends ICategory, mongoose.Document {}

/**
 * interface of the mongoose-model
 * can be used defining static methods
 */
interface ICategoryModelMongoose
    extends mongoose.Model<ICategoryMongoose>,
        ICategoryModel {}

/**
 * mongoose-schema of the category
 */
const categorySchema = new Schema({
    name: { type: String, unique: true, required: true, dropDups: true },
    description: { type: String },
})

/**
 * mongoose-model of the category
 */
const Category = mongoose.model<ICategoryMongoose, ICategoryModelMongoose>(
    'Category',
    categorySchema
)
export { Category }
