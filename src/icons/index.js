// 前面不包含index和SVGIcon 的js 文件
const ctx = require.context('./', true, /(?<!(\/index|\/SVGIcon))\.js$/)
const modules = {}
ctx.keys().forEach(iconFile => {
    const fileName = /\/([^/]+)\.js/.exec(iconFile)[1]
    let mod = ctx(iconFile)
    mod = mod.default || mod
    modules[fileName] = mod
})
export default modules