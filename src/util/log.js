const style = {
    css: 'padding: 2px 4px; border-radius: 4px;',
    log: 'color: #ffffff; background: green;',
    warn: 'color: #ffffff; background: #E6A23C;'
}
export const debug = (...args) => {
    /* eslint-disable */
    console.log.call(console, '%cDebug:', `${style.log} ${style.css}`, ...args)
}
export const warn = (...args) => {
    /* eslint-disable */
    console.warn.call(console, '%cWarning:', `${style.warn} ${style.css}`, ...args)
}