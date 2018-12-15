import { File } from './file.model'
import { default as fs } from 'fs'

const FileController = {
    writeToFile: (file: any, mimeTypes: string[], name: string) => {
        return new Promise(async (resolve, reject) => {
            if (file) {
                const stream = await file
                const mimeType = stream.mimetype
                const fileName = name + '_' + Date.now()
                const subPath = fileName + '.' + mimeType.split('/')[1]
                const path = 'public/' + subPath
                const source =
                    global.gConfig.protocol +
                    '://' +
                    global.gConfig.server +
                    ':' +
                    global.gConfig.server_port +
                    '/static/' +
                    subPath
                if (mimeTypes.includes(mimeType)) {
                    const readStream = await stream.createReadStream()
                    const createWriteStream = fs.createWriteStream(path)
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
    file: async id => {
        const file = await File.findById(id)
        return file
    },
}

export { FileController }
