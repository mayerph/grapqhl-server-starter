/**
 * interface of a product (schema)
 * can be used to define non-static methods
 */
export interface IProduct {
    id?: any
    topic: any
    stock: number
    name: string
    description: string
    price: number
    categories: number[]
    gender: string
    img: any
}

/**
 * interface of a product (model)
 * can be used to define static methods
 */
export interface IProductModel {}
