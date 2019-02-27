import mongoose from 'mongoose'
import { IProduct, IProductModel } from './product.interface'

const Schema = mongoose.Schema
/**
 * interface of the mongoose-schema
 * can be used to define properties and non-static methods
 */
interface IProductMongoose extends IProduct, mongoose.Document {}

/**
 * interface of the mongoose-model
 * can be used defining static methods
 */
interface IProductModelMongoose
    extends mongoose.Model<IProductMongoose>,
        IProductModel {}

/**
 * mongoose-schema of a product
 */
const productSchema = new Schema({
    topic: [{ type: Schema.Types.ObjectId, ref: 'Category' }],
    stock: { type: Number, required: true, default: 0 },
    name: { type: String, unique: true, required: true, dropDups: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    categories: [{ type: Schema.Types.ObjectId, ref: 'Category' }],
    gender: { type: String, enum: ['MALE', 'FEMALE', 'UNISEX'] },
    img: { type: Schema.Types.ObjectId, ref: 'File' },
})

/**
 * mongoose-model of a product
 */
const Product = mongoose.model<IProductMongoose, IProductModelMongoose>(
    'Product',
    productSchema
)
export { Product }
