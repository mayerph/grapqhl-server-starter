/**
 * interface of a category (schema)
 * can be used to define non-static methods
 */
export interface ICategory {
    id?: any
    name: string
    description: string
}

/**
 * interface of a category (model)
 * can be used to define static methods
 */
export interface ICategoryModel {}
