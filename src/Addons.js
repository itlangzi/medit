import { isFunction, isPlainObject, warn, uuid } from './util'

const fileNameReg = /([^/]+)\.js$/

const resolveBuiltInAddons = () => {
    const addons = {}
    const ctx = require.context('./addons', true, /(?<!\/Addon)\.js$/)
    ctx.keys().forEach(addonFile => {
        let mod = ctx(addonFile)
        const name = mod.name || (matchs ? matchs[1] : '')
        
        mod = mod.default || mod
        const matchs = fileNameReg.exec(addonFile)
        if (!name) {
            throw new Error(`Addon ${addonFile} name is missing.`)
        }
        addons[name] = { name, component: mod }
    })
    return addons
}
const builtIn = resolveBuiltInAddons()
const __resolveAddons__ = (addons = [], editor, i18n) => {
    return (addons || []).map(addon => {
        if (typeof addon === 'string') {
            if (!builtIn[addon]) {
                warn(`Addon "${addon}" is not support, will be ignored.`)
                return false
            }
            return {
                name: addon,
                component: builtIn[addon].component
            }
        } else if (isFunction(addon)) {
            const fnName = addon.name
            addon = addon(editor, i18n)
            if (!addon || isPlainObject(addon)) {
                warn('Addon function must return Object.')
                return false
            }
            if (!addon.component) {
                warn('Addon must contains "component".')
                return false
            }
            let name = addon.name || fnName
            if (!name) {
                name = uuid() + '-Addon'
            }
            return {
                name,
                component: addon.component,
                language: addon.language
            }

        } else if (isPlainObject(addon)) {
            let { name, component, language } = addon
            if (!component) {
                warn('Addon must contains "component".')
                return false
            }
            name = name || uuid() + '-Addon'
            return { name, component, language }
        }
        warn('Addon only allow Function or Object')
        return false
    }).filter(Boolean)
}
export const resolveAddons = (addons = [], editor, i18n) => {
    return (addons || []).map(addon => {
        if (!Array.isArray(addon)) {
            return __resolveAddons__([addon], editor, i18n)
        } else {
            return __resolveAddons__(addon, editor, i18n)
        }
    }).filter(item => item && item.length > 0)
}