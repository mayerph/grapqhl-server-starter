import { File } from './file.model'
import { default as fs } from 'fs'

/**
 * Implements all logic related to a file.
 */
const FileController = {
    /**
     * writes file to disk
     * @param file - file to be written
     * @param mimeTypes - allowed MIME-types
     * @param name - name of the file
     */
    writeToFile: (file: any, mimeTypes: string[], name: string) => {
        return new Promise(async (resolve, reject) => {
            if (file) {
                const stream = await file
                // get mimeType of the file
                const mimeType = stream.mimetype

                // create name of the file
                const fileName = name + '_' + Date.now()

                // create name of the file with file extension
                const subPath = fileName + '.' + mimeType.split('/')[1]

                // full path to the file
                const path = 'public/' + subPath

                // http reference to the file
                const source =
                    global.gConfig.protocol +
                    '://' +
                    global.gConfig.server +
                    ':' +
                    global.gConfig.server_port +
                    '/static/' +
                    subPath
                // check if file has the necessary mime type
                if (mimeTypes.includes(mimeType)) {
                    // creates readStream of the file
                    const readStream = await stream.createReadStream()

                    // creates writeStream with full path to the file
                    const createWriteStream = fs.createWriteStream(path)

                    // pipes readStream to writeStream --> writes to disk
                    readStream.pipe(
                        createWriteStream.on('finish', () => {
                            resolve({ fileName, mimeType, source })
                        })
                    )
                } else {
                    reject(
                        new Error(
                            'file format ' + mimeType + ' is not supported'
                        )
                    )
                }
            } else {
                resolve(null)
            }
        }).catch(err => {
            throw err
        })
    },
    /**
     * writes image-file on disk
     * @param name - name of the file
     * @param img - image to be written
     */
    createImageFile: async (name: string, img: any) => {
        const mimeTypes = ['image/png', 'image/jpeg']
        const {
            fileName,
            mimeType,
            source,
        }: any = await FileController.writeToFile(img, mimeTypes, name)
        const image = new File({
            name: fileName,
            mimeType,
            source,
        })
        await image.save()
        return image
    },
    /**
     * return metadata of file by id
     * @param id - id of file
     */
    file: async id => {
        const file = await File.findById(id).exec()
        return file
    },
}

export { FileController }
