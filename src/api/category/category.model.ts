import mongoose from 'mongoose'
import { ICategory, ICategoryModel } from './category.interface'

const Schema = mongoose.Schema

interface ICategoryMongoose extends ICategory, mongoose.Document {}

interface ICategoryModelMongoose
    extends mongoose.Model<ICategoryMongoose>,
        ICategoryModel {}

const categorySchema = new Schema({
    name: { type: String, unique: true, required: true, dropDups: true },
    description: { type: String },
})

const Category = mongoose.model<ICategoryMongoose, ICategoryModelMongoose>(
    'Category',
    categorySchema
)
export { Category }
