import React from 'react'
import icons from '@/icons'
import Addon from './Addon'
import { isPlainObject, isPromise, isImage } from '@/util'
import Modal from '../components/modal'
class Image extends Addon {
    constructor(props) {
        super(props)
        this.state = {
            ...this.state,
            visible: false,
            alt: '',
            link: '',
            errMsg: '',
            preview: false
        }
        this.fileRef = null
    }
    showMsg = (errMsg = '') => {
        this.setState({ errMsg })
    }
    uploaded = (res, file) => {
        const { i18n, toastr } = this.props
        if (!isPlainObject(res)) {
            toastr.error(i18n('return value must be object'))
            this.showMsg(i18n('return value must be object'))
            return
        }
        if (!res.url) {
            toastr.error(i18n('image url parameter is required', { imageUrl: 'url' }))
            this.showMsg(i18n('image url parameter is required', { imageUrl: 'url' }))
            return
        }
        let preview = false
        if (isImage(file.type)) {
            preview = true
        }
        const name = res.name || file.name
        this.setState({ alt: name, link: res.url, errMsg: '', preview })
    }
    onImage = e => {
        e.stopPropagation()
        e.preventDefault()
        this.setState({ visible: true })

    }
    onInsertImage = () => {
        const { alt, link } = this.state
        const { editor } = this.props
        const { line, ch } = editor.getCursor()
        const content = `![${alt || ''}](${link || ''} "${alt || ''}")`
        editor.replaceRange(content, { line, ch }, { line, ch })
        editor.focus()
        this.onClose()
    }
    onClose = () => {
        this.setState({ visible: false, alt: '', link: '', errMsg: '' })
    }
    onAltChange = e => {
        this.setState({ alt: e.target.value })
    }
    onLinkChange = e => {
        this.setState({ link: e.target.value })
    }
    onFileUpload = e => {
        this.showMsg()
        this.fileRef.click()
    }
    onFileChange = e => {
        const { i18n, options = {}, toastr } = this.props
        const files = e.target.files
        const file = files && files.length > 0 ? files[0] : null
        if (file) {
            if (!isImage(file.type)) {
                toastr.error(i18n('only upload files of image type'))
                this.showMsg(i18n('only upload files of image type'))
                return
            }
            const uploaded = options.upload(file)
            if (isPromise(uploaded)) {
                uploaded.then(res => {
                    this.uploaded(res, file)
                }).catch(error => {
                    const msg = error.message || i18n('image upload error')
                    toastr.error(msg)
                    this.showMsg(msg)
                })
            } else {
                this.uploaded(uploaded, file)
            }
        } else {
            toastr.error(i18n('file is empty'))
            this.showMsg(i18n('file is empty'))
        }
    }
    render() {
        const { i18n, cssPrefix, options = {} } = this.props
        const { visible, alt, link, errMsg, preview } = this.state
        const isEnableUpload = options.upload && typeof options.upload === 'function'
        return (
            <>
                <a href="" title={i18n('image')} onClick={this.onImage}>
                    <icons.Image />
                </a>
                <Modal
                    title="插入图片"
                    visible={visible}
                    onClose={this.onClose}
                    cssPrefix={cssPrefix}
                >
                    <div className={`${cssPrefix}flex`}>
                        <div className={`${cssPrefix}form ${cssPrefix}form-horizontal ${cssPrefix}form-normal`}>
                            <div className={`${cssPrefix}flex ${cssPrefix}form-item`}>
                                <div className={`${cssPrefix}form-item-label`}>
                                    <label>{i18n('image alt')}</label>
                                </div>
                                <div className={`${cssPrefix}form-item-control`}>
                                    <input
                                        placeholder={i18n('image alt')}
                                        name="alt"
                                        value={alt}
                                        onChange={this.onAltChange}
                                        maxLength={2000}
                                    />
                                </div>
                            </div>
                            <div className={`${cssPrefix}flex ${cssPrefix}form-item ${cssPrefix}mt-15`}>
                                <div className={`${cssPrefix}form-item-label`}>
                                    <label>{i18n('image link')}</label>
                                </div>
                                <div className={`${cssPrefix}form-item-control`}>
                                    <input
                                        placeholder={i18n('image link') + ', ' + i18n('support network or upload')}
                                        name="link"
                                        value={link}
                                        onChange={this.onLinkChange}
                                        maxLength={2000}
                                    />
                                </div>
                            </div>
                            <div className={`${cssPrefix}flex ${cssPrefix}form-item ${cssPrefix}mt-15`}>
                                <div className={`${cssPrefix}form-item-label`} />
                                <div className={`${cssPrefix}form-item-control`}>
                                    <button
                                        type="button"
                                        className={`${cssPrefix}button ${cssPrefix}button--primary`}
                                        onClick={this.onInsertImage}
                                    >
                                        {i18n('confirm')}
                                    </button>
                                    <button
                                        type="button"
                                        className={`${cssPrefix}button`}
                                        onClick={this.onClose}
                                    >
                                        {i18n('cancel')}
                                    </button>
                                </div>
                            </div>
                        </div>
                        {
                            isEnableUpload ? (
                                <div className={`${cssPrefix}image-upload ${errMsg ? `${cssPrefix}upload-error` : ''}`}>
                                    <div
                                        className={`${cssPrefix}image-upload-dragger`}
                                        onClick={this.onFileUpload}
                                    >
                                        {
                                            preview ?
                                                (
                                                    <img src={link} alt={alt} />
                                                ) :
                                                (
                                                    <icons.Upload />
                                                )
                                        }
                                    </div>
                                    <input
                                        ref={ref => { this.fileRef = ref }}
                                        type="file"
                                        name="file"
                                        className={`${cssPrefix}file`}
                                        onChange={this.onFileChange}
                                    />
                                    <div className={`${cssPrefix}upload--tip`}>
                                        {errMsg}
                                    </div>
                                </div>
                            ) : null
                        }
                    </div>
                </Modal>
            </>
        )
    }
}

export default Image
export const name = 'image'