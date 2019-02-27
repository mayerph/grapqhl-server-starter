/**
 * interface of a topic (schema)
 * can be used to define non-static methods
 */
export interface ITopic {
    id?: any
    name: string
    description: string
}

/**
 * interface of a topic (model)
 * can be used to define static methods
 */
export interface ITopicModel {}
