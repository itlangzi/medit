import MarkdownIt from 'markdown-it'

import checkbox from 'markdown-it-checkbox'
/**
 * 上标标签
 * 29^th^
 */
import sup from 'markdown-it-sup'
/**
 * 下标标签
 * H~2~0
 */
import sub from 'markdown-it-sub'
/**
 * 高亮标签
 * ==marked==
 */
import mark from 'markdown-it-mark'
/**
 * 生成插入标签。
 * ++inserted++
 */
import ins from 'markdown-it-ins'
/**
 * abbr 缩写标签
 * *[HTML]: Hyper Text Markup Language
 * *[W3C]:  World Wide Web Consort
 */
import abbr from 'markdown-it-abbr'
/**
 * 键位标签。
 * [[x]]
 */
import kbd from 'markdown-it-kbd'
/**
 * a标签下划线
 * _a_
 */
import underline from 'markdown-it-underline'
/**
 * emoji
 */
import emoji from 'markdown-it-emoji'
/**
 * 链接符号
 */
import anchor from 'markdown-it-anchor'

/**
 * katex
 */
// https://goessner.github.io/markdown-it-texmath/
import katex from '@iktakahiro/markdown-it-katex'
// import katex from 'katex'
import 'katex/dist/katex.min.css'

// import math from 'markdown-it-math'

import iterator from 'markdown-it-for-inline'

import Prism from 'prismjs'

const urlPatten = new RegExp('^[a-zA-z]+:\\/\\/[^\\s]*', 'i')
const resolveLinkExcludes = excludes => {
    if (!excludes || excludes.length === 0) {
        return []
    }
    if (Array.isArray(excludes)) {
        return excludes
    }
    if (typeof excludes === 'string') {
        return [excludes]
    }
    return []
}

class Renderer {
    constructor(options = {}) {
        this.options = options
        const highlight = typeof options.highlight === 'function' ? options.highlight : (code, lang) => {
            if (Prism.languages[lang]) {
                // 语法高亮
                code = Prism.highlight(code, Prism.languages[lang], lang)// 
            } else {
                code = md.utils.escapeHtml(code)
            }
            return `<pre class="language-${lang} line-numbers"><code class="language-${lang}">${code}</code></pre>`
        }

        const {
            excludes = new window.URL(location.href).host,
            target = '_blank',
            relativeExclude = true
        } = this.options.link || {}

        const __excludes__ = resolveLinkExcludes(excludes)

        const md = new MarkdownIt(Object.assign({}, {
            html: true,
            linkify: true,
            typographer: true
        }, this.options, { highlight }))
            .use(iterator, 'url_new_win', 'link_open', function (tokens, idx) {
                const targetIndex = tokens[idx].attrIndex('target')
                const hrefIndex = tokens[idx].attrIndex('href')
                if (hrefIndex < 0) {
                    return
                }
                const href = tokens[idx].attrs[hrefIndex][1]
                if (!href) {
                    return
                }
                if (!urlPatten.test(href)) {
                    if (relativeExclude === true) {
                        return
                    }
                } else {
                    if (__excludes__.indexOf(new URL(href).host) > -1) {
                        return
                    }
                }
                if (targetIndex < 0) {
                    tokens[idx].attrPush(['target', target])
                } else {
                    tokens[idx].attrs[targetIndex][1] = target
                }
            })
            // .use(taskCheckboxList, { disabled: false })
            .use(checkbox, { disabled: false })
            .use(sup)
            .use(sub)
            .use(ins)
            .use(abbr)
            .use(kbd)
            .use(underline)
            .use(emoji)
            .use(anchor)
            .use(mark)
            .use(katex)
        if (options.plugins && Array.isArray(options.plugins)) {
            options.plugins.forEach(plugin => {
                if (!plugin) {
                    return
                }
                if (Array.isArray(plugin)) {
                    if (plugin.length > 0) {
                        const [arg, ...args] = plugin
                        md.use(arg, ...args)
                    }
                } else {
                    md.use(plugin)
                }
            })
        }
        this.markdown = md
    }
    render(content) {
        return this.markdown.render(content)
    }
    parse(md) {
        return this.markdown.parse(md || '', {})
    }
}

export default Renderer