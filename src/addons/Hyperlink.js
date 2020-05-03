import React from 'react'
import icons from '@/icons'
import Addon from './Addon'
import Dropdown from '../components/dropdown'

class Hyperlink extends Addon {
    constructor(props) {
        super(props)
        this.state = { ...this.state, text: '', title: '', href: ''/* , target: '' */ }
        this.dropdownRef = null
    }
    onHyperlinkOver = e => {
        e.preventDefault()
        const { editor } = this.props
        const seletion = editor.getSelection()
        this.setState({ text: seletion })
    }
    onHyperlink = e => {
        e.preventDefault()
    }
    onTextChange = e => {
        this.setState({ text: e.target.value })
    }
    onTitleChange = e => {
        this.setState({ title: e.target.value })
    }
    onHrefChange = e => {
        this.setState({ href: e.target.value })
    }
    /*  onTargetChange = e => {
         this.setState({ target: e.target.value })
     } */
    onInsert = e => {
        const { editor } = this.props
        const { text, title, href } = this.state
        const content = `[${text}](${href} "${title}")`
        editor.replaceSelection(content)
        this.dropdownRef.close()
    }
    render() {
        const { i18n, cssPrefix } = this.props
        const { text, title, href } = this.state
        return (
            <Dropdown
                ref={ref => { this.dropdownRef = ref }}
                cssPrefix={cssPrefix}
                overlayClassName={`${cssPrefix}pb-0`}
                hiddenOnSelect={false}
                overlay={
                    <div className={`${cssPrefix}form ${cssPrefix}form-horizontal ${cssPrefix}form-normal `}>
                        <div className={`${cssPrefix}flex ${cssPrefix}form-item ${cssPrefix}mt-10`}>
                            <div className={`${cssPrefix}form-item-label`}>
                                <label>{i18n('link text')}</label>
                            </div>
                            <div className={`${cssPrefix}form-item-control`}>
                                <input
                                    placeholder={i18n('link text')}
                                    name="text"
                                    value={text}
                                    onChange={this.onTextChange}
                                    maxLength={2000}
                                />
                            </div>
                        </div>
                        <div className={`${cssPrefix}flex ${cssPrefix}form-item ${cssPrefix}mt-10`}>
                            <div className={`${cssPrefix}form-item-label`}>
                                <label>{i18n('link href')}</label>
                            </div>
                            <div className={`${cssPrefix}form-item-control`}>
                                <input
                                    placeholder={i18n('link href') + ' https?://'}
                                    name="href"
                                    value={href}
                                    onChange={this.onHrefChange}
                                    maxLength={2000}
                                />
                            </div>
                        </div>
                        <div className={`${cssPrefix}flex ${cssPrefix}form-item ${cssPrefix}mt-10`}>
                            <div className={`${cssPrefix}form-item-label`}>
                                <label>{i18n('title')}</label>
                            </div>
                            <div className={`${cssPrefix}form-item-control`}>
                                <input
                                    placeholder={i18n('title')}
                                    name="title"
                                    value={title}
                                    onChange={this.onTitleChange}
                                    maxLength={2000}
                                />
                            </div>
                        </div>
                        {/* <div className={`${cssPrefix}row ${cssPrefix}form-item`}>
                            <div className={`${cssPrefix}form-item-label`}>
                                <label>打开方式</label>
                            </div>
                            <div className={`${cssPrefix}form-item-control`}>
                                <select
                                    placeholder="打开方式"
                                    name="target"
                                    value={target}
                                    onChange={this.onTargetChange}
                                    maxLength={2000}
                                >
                                    <option value="">当前窗口</option>
                                    <option value="_blank">新窗口</option>
                                </select>
                            </div>
                        </div> */}
                        <div className={`${cssPrefix}form-item ${cssPrefix}form-item-buttons ${cssPrefix}mt-15`}>
                            <div className="btn-ok" onClick={this.onInsert}>
                                {i18n('confirm')}
                            </div>
                        </div>
                    </div>
                }
            >

                <a href="" title={i18n('hyperlink')} onClick={this.onHyperlink} onMouseOver={this.onHyperlinkOver}>
                    <icons.Link />
                </a>
            </Dropdown>

        )
    }
}

export default Hyperlink
export const name = 'hyperlink'