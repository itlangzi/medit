import { isFunction, isPromise, isPlainObject } from "./base"
import { warn } from "./log"

export const fileUpload = (files, upload) => {
    if (!isFunction(upload)) {
        return Promise.reject(new Error('Upload is not support.'))
    }
    if (!files) {
        return Promise.reject(new Error('Files is empty.'))
    }
    const res = upload(files)
    if (isPromise(res)) {
        return res
    }
    return Promise.resolve(res)
}

const imageTypePattern = /^image\//
export const isImage = fileType => {
    return imageTypePattern.test(fileType)
}

export const toMarkdownLink = files => {
    if (!Array.isArray(files)) {
        files = [files]
    }
    const images = []
    const fileLinks = []
    files.forEach(fileItem => {
        if (!isPlainObject(fileItem)) {
            warn('return value must be object')
            return
        }
        if (!fileItem.url) {
            warn('url parameter is required')
        }
        if (isImage(fileItem.type)) {
            images.push(`![${fileItem.name || ''}](${fileItem.url || ''} "${fileItem.name || ''}")`)
        } else {
            fileLinks.push(`[${fileItem.name || ''}](${fileItem.url || ''} "${fileItem.name || ''}")`)
        }
    })
    return { images, files: fileLinks }

}