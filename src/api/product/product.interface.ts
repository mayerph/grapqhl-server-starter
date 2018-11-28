import { ITopic } from '../topic/topic.interface'

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

export interface IProductModel {}
