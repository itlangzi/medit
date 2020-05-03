export const isString = function (value) {
    return typeof value === 'string'
}
export const isFunction = function (obj) {
    return typeof obj === 'function'
}
export const isBlank = function (value) {
    if (
        !value ||
        (typeof value === 'string' && value.length === 0) ||
        (Array.isArray(value) && value.length === 0)
    ) {
        return true
    }
    return false
}
export const trim = str => {
    return (str || '').replace(/^\s*/, '').replace(/\s*$/, '')
}
export const uuid = function () {
    let d = new Date().getTime()
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (d + Math.random() * 16) % 16 | 0
        d = Math.floor(d / 16)
        return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16)
    })
}
export const isPromise = function (obj) {
    return Object.prototype.toString.call(obj) === '[object Promise]'
}
export const isPlainObject = function (obj) {
    return Object.prototype.toString.call(obj) === '[object Object]'
}
const __extend__ = (t, s, deep) => {
    // 遍历原对象属性值
    for (let key in s) {

        if (deep && (isPlainObject(s[key]) || Array.isArray(s[key]))) {

            if (isPlainObject(s[key]) && !isPlainObject(t[key])) {
                t[key] = {}
            }

            if (Array.isArray(s[key]) && !Array.isArray(t[key])) {
                t[key] = []
            }

            __extend__(t[key], s[key], deep)

        } else if (s[key] !== undefined) {
            if (t[key] !== s[key])
                t[key] = s[key]
        }
    }
}
export const extend = function (t) {
    let deep, args = [].slice.call(arguments, 1)

    if (typeof t === 'boolean') {
        deep = true
        t = args.shift()
    }

    args.forEach(arg => __extend__(t, arg, deep))

    return t
}
/**
 * 首字母大写
 */
export const capitalize = str => (str || '').replace(/( |^)[a-z]/g, l => l.toUpperCase())
/**
 * 首字母小写
 */
export const lowercase = str => (str || '').replace(/( |^)[A-Z]/g, l => l.toLowerCase())

export const isPlatformWindows = /windows|win32/i.test(navigator.userAgent)