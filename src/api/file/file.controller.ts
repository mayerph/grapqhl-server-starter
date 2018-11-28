import { File } from './file.model'

const FileController = {
    encodeFile: (file: any, mimeTypes: string[], name: string) => {
        return new Promise(async (resolve, reject) => {
            if (file) {
                const stream = await file
                const mimeType = stream.mimetype
                const fileName = name + Date.now()
                if (mimeTypes.includes(mimeType)) {
                    const readStream = await stream.createReadStream()
                    const chunks = []
                    readStream
                        .on('data', async chunk => {
                            await chunks.push(chunk)
                        })
                        .on('end', async () => {
                            const encodedFile = Buffer.concat(chunks).toString(
                                'base64'
                            )
                            resolve({ encodedFile, mimeType, fileName })
                        })
                        .on('error', () => {
                            reject(new Error('file upload failed'))
                        })
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
            encodedFile,
            mimeType,
            fileName,
        }: any = await FileController.encodeFile(img, mimeTypes, name)
        const image = new File({
            name: fileName,
            mimeType,
            source: encodedFile,
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
