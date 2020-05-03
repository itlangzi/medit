import React from 'react'
import { hotKeys } from '../../util'
class Helper extends React.PureComponent {
    render() {
        const { i18n, cssPrefix } = this.props
        return (
            <div className={`${cssPrefix}helper`}>
                <strong className={`${cssPrefix}helper-title`}>Markdown {i18n('tutorial')}</strong>
                <ul>
                    <li><a href="https://www.markdownguide.org/basic-syntax/" rel="nofollow noopener noreferrer" target="_blank">Markdown Guide</a></li>
                    <li><a href="https://daringfireball.net/projects/markdown/" rel="nofollow noopener noreferrer" target="_blank">Markdown</a></li>
                    <li><a href="https://help.github.com/en/github/writing-on-github" rel="nofollow noopener noreferrer" target="_blank">GitHub Flavored Markdown</a></li>
                    <li><a href="https://www.lolimay.cn/2019/01/22/katex%E8%AF%AD%E6%B3%95%E6%B5%8B%E8%AF%95/" rel="nofollow noopener noreferrer" target="_blank">Katex语法测试</a></li>
                </ul>
                <hr />
                <strong className={`${cssPrefix}helper-title`}>{i18n('shortcuts')} (Keyboard shortcuts)</strong>
                <ul>
                    <li>{hotKeys.help} {i18n('help')}</li>
                    <li>{hotKeys.bold} {i18n('bold')}</li>
                    <li>{hotKeys.inlineCode} {i18n('inline code')}</li>
                    <li>{hotKeys.code} {i18n('block code')}</li>
                    <li>{hotKeys.codeFold} {i18n('switch code fold')}</li>
                    <li>{hotKeys.del} {i18n('delete line')}</li>
                    <li>{hotKeys.italic} {i18n('italic')}</li>
                    <li>{hotKeys.heading0} {i18n('no heading')}</li>
                    <li>{hotKeys.heading1} {i18n('heading')}1</li>
                    <li>{hotKeys.heading2} {i18n('heading')}2</li>
                    <li>{hotKeys.heading3} {i18n('heading')}3</li>
                    <li>{hotKeys.heading4} {i18n('heading')}4</li>
                    <li>{hotKeys.heading5} {i18n('heading')}5</li>
                    <li>{hotKeys.heading6} {i18n('heading')}6</li>
                    <li>{hotKeys.unorderedList} {i18n('unordered list')}</li>
                    <li>{hotKeys.orderedList} {i18n('ordered list')}</li>
                    <li>{hotKeys.todoList} {i18n('todo list')}</li>
                    <li>{hotKeys.search} {i18n('find')}</li>
                    <li>{hotKeys.replace} {i18n('replace')}</li>
                    <li>{hotKeys.findPrevious}  {i18n('find previous search results')}</li>
                    <li>{hotKeys.replaceAll} {i18n('replace all')}</li>
                    <li>{hotKeys.undo} {i18n('undo')}</li>
                    <li>{hotKeys.redo} {i18n('redo')}</li>
                    <li>{hotKeys.save} {i18n('cache')}</li>
                    <li>{hotKeys.clear} {i18n('clear cache')}</li>
                    <li>{hotKeys.fullscreen} {i18n('fullscreen')}</li>
                </ul>
                <hr />
                <strong className={`${cssPrefix}helper-title`}>Markdown {i18n('syntax')} </strong>
                <strong className={`${cssPrefix}helper-sub-title`}>{i18n('heading')} </strong>
                <h1># {i18n('heading')} 1</h1>
                <h2>## {i18n('heading')} 2</h2>
                <h3>### {i18n('heading')} 3</h3>
                <h4>#### {i18n('heading')} 4</h4>
                <h5>##### {i18n('heading')} 5</h5>
                <h6>###### {i18n('heading')} 6</h6>
                <hr />
                <strong className={`${cssPrefix}helper-sub-title`}>{i18n('plaintext')}</strong>
                <div>
                    <i>*{i18n('emphasize text')}*</i> <i>_{i18n('emphasize text')}_</i>
                </div>
                <div>
                    <strong>**{i18n('bold')}{i18n('plaintext')}**</strong>
                </div>
                <div>
                    <del>~~{i18n('strikethrough')}{i18n('plaintext')}~~</del>
                </div>
                <div>
                    <blockquote>&gt; {i18n('blockquote')}{i18n('plaintext')}</blockquote>
                </div>
                <hr />
                <strong className={`${cssPrefix}helper-sub-title`}>{i18n('list')}</strong>
                <ul>
                    <li>- example 1</li>
                    <li>
                        - example 2
                        <ul>
                            <li>- example 2.1</li>
                            <li>- example 2.2</li>
                        </ul>
                    </li>
                </ul>
                <ol>
                    <li>1. example 1</li>
                    <li>
                        2. example 2
                        <ol>
                            <li>2.1 example 2.1</li>
                            <li>2.2 example 2.2</li>
                        </ol>
                    </li>
                </ol>
                <ul>
                    <li>
                        <input type="checkbox" />
                        - [ ] example 1
                    </li>
                    <li>
                        <input type="checkbox" defaultChecked />
                        - [x] example 2
                    </li>
                </ul>

                <hr />
                <strong className={`${cssPrefix}helper-sub-title`}>{i18n('link')}</strong>
                <div>{i18n('link')}: [Medit](https://www.itlangzi.com/medit &quot;Medit&quot;)</div>
                <br />
                <div>{i18n('image')}{i18n('link')}: ![Medit Logo](https://www.itlangzi.com/medit/logo.png &quot;Medit Logo&quot;)</div>

                <hr />
                <strong className={`${cssPrefix}helper-sub-title`}>{i18n('code snippets')}</strong>
                <br />
                <div>{i18n('inline code')} <code>`{i18n('inline code')}`</code></div>
                <br />
                <div>{i18n('block code')} </div>
                <div>
                    <pre>
                        <code>
                            ```<br />
                            const medit = new Medit()<br />
                            ```
                        </code>
                    </pre>
                </div>
                <div>
                    <pre>
                        <code>
                            ```javascript<br />
                            const medit = new Medit()<br />
                            ```
                        </code>
                    </pre>
                </div>
                <hr />
                <strong className={`${cssPrefix}helper-sub-title`}>{i18n('table')}</strong>
                <div>
                    <pre>
                        <code>
                            example | value <br />
                            --- | --- <br />
                            item 1 | $1000<br />
                            item 2 | $500<br />
                        </code>
                    </pre>
                </div>
                <div>
                    <pre>
                        <code>
                            |{i18n('align left')} | {i18n('align center')} | {i18n('align right')} |<br />
                            |:---   |:---:|---:| <br />
                            |item   | $1000 | desc |<br />
                        </code>
                    </pre>
                </div>
                <strong className={`${cssPrefix}helper-sub-title`}>{i18n('sup')}</strong>
                <div>
                    <span> 2^3^ </span>
                    <span>
                        2<sup>3</sup>
                    </span>
                </div>
                <strong className={`${cssPrefix}helper-sub-title`}>{i18n('sub')}</strong>
                <div>
                    <span> H~2~0 </span>
                    <span>
                        H<sub>2</sub>O
                    </span>
                </div>
                <strong className={`${cssPrefix}helper-sub-title`}>{i18n('marked')}</strong>
                <div>
                    <span> ==marked== </span>
                    <span>
                        <mark>marked</mark>
                    </span>
                </div>
                <strong className={`${cssPrefix}helper-sub-title`}>{i18n('inserted')}</strong>
                <div>
                    <span> ++inserted++ </span>
                    <span>
                        <ins>inserted</ins>
                    </span>
                </div>
                <strong className={`${cssPrefix}helper-sub-title`}>{i18n('abbr')}</strong>
                <div>
                    <pre>
                        <code>
                            *[HTML]: Hyper Text Markup Language<br />
                            *[W3C]:  World Wide Web Consort<br />
                            HTML Hyper Text Markup Language<br />
                            W3C  World Wide Web Consort<br />
                        </code>
                    </pre>
                    <span>
                        <abbr title="Hyper Text Markup Language<br />">HTML</abbr> Hyper Text Markup Language<br />
                        <abbr title="World Wide Web Consort<br />">W3C</abbr>  World Wide Web Consort<br />
                    </span>
                </div>
                <strong className={`${cssPrefix}helper-sub-title`}>{i18n('katex')}</strong>
                <div>
                    <pre>
                        <code>
                            {`
$$
\\left(\\frac{\\large{a + b}}{\\large{a_1 - b_2 ^ 2}} \\right)
$$
`}
                        </code>
                    </pre>
                </div>
            </div>
        )
    }
}

export default Helper