import i18n from 'i18next'
import { initReactI18next, Translation } from 'react-i18next'
i18n.use(initReactI18next)
    .init({
        resources: {},
        keySeparator: false, // we do not use keys in form messages.welcome
        lng: window.navigator.language || window.navigator.userLanguage,
        fallbackLng: ['en', 'zh-CN'],
        interpolation: {
            escapeValue: false // react already safes from xss
        }
    })

const ctx = require.context('./lang', false, /\.js$/)
ctx.keys().map(ctx).map(item => item.default || item).forEach(lang => {
    Object.keys(lang).forEach(lng => {
        Object.keys(lang[lng]).forEach(ns => {
            i18n.addResourceBundle(lng, ns, lang[lng][ns])
        })
    })
})

export default i18n
export { Translation }