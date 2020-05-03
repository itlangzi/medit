const CONTENT_ID = 'md'

export const saveCache = (content, key) => {
    key = key || CONTENT_ID
    content = content || ''
    localStorage.setItem(key, content)
}

export const cleanCache = (key) => {
    key = key || CONTENT_ID
    localStorage.removeItem(key)
}

export const getCache = (key) => {
    key = key || CONTENT_ID
    return localStorage.getItem(key) || ''
}