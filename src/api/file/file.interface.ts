/**
 * interface of a file (schema)
 * can be used to define non-static methods
 */
export interface IFile {
    id?: any
    name: string
    mimeType: string
    source: string
}

/**
 * interface of a file (model)
 * can be used to define static methods
 */
export interface IFileModel {}
