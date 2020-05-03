import React from 'react'
import Scrollbar from 'smooth-scrollbar'
import i18n, { Translation } from './i18n'
import {
    extend, resize, warn, download, saveCache, launchFullscreen,
    exitFullscreen, isFullscreen,
    cleanCache, getCache, isFunction, fileUpload, toMarkdownLink
} from './util'
import defaultOptions from './defaultOptions'
import defaultState from './defaultState'
import ReactCodeMirror from './codemirror'
import { Renderer } from './markdown'
import { resolveAddons } from './Addons'
import icons from '@/icons'
import Helper from './components/helper'
import Spinner from './components/spinner'
import toastr from 'toastr'
import 'toastr/toastr.less'
import './skins/default/style.less'
const defaultFilename = 'Untitled'
const {
    Question, NavbarToggler, Columns, Eye,
    ScrollSync, StatusBarToggler, Edit, Close
} = icons

class Editor extends React.PureComponent {
    constructor(props) {
        super(props)

        const customOptions = extend(true, {}, defaultOptions, props.options)
        // toolbar addons
        // initial all addons
        customOptions.toolbars = resolveAddons(customOptions.toolbars || [])

        // addons
        this.toolbarInstances = {};
        customOptions.toolbars.forEach(group => {
            group.forEach(item => {
                this.toolbarInstances[item.name] = { ref: null }
            })
        })

        const mergeOptions = {}

        // check options
        Object.keys(customOptions).forEach(key => {

            if ((key in this.toolbarInstances) || (key in customOptions)) {
                mergeOptions[key] = customOptions[key]
                return
            }
            warn(`prop "${key}" is not allowed.`)
        })

        const draftValue = getCache() || ''
        if (draftValue) {
            if (!mergeOptions.editorOptions) {
                mergeOptions.editorOptions = { value: draftValue }
            } else if (!mergeOptions.editorOptions.value) {
                mergeOptions.editorOptions.value = draftValue
            }
        }
        this.state = extend(true, {}, defaultState, mergeOptions)

        this.containerRef = null
        this.toolBarsRef = null
        this.mainRef = null
        this.statusRef = null
        this.previewWrapperRef = null
        this.sideMainRef = null

        this.editor = null

        this.previewScrollbar = null

        this.markdown = new Renderer(this.state.markdownOptions)

        // scroll locked 
        this.scrollLocked = undefined // undefined; 1 left scroll locked ; 2 right scroll locked;

        this.keyEvents = []

        this.interval = undefined

    }
    componentDidMount() {

        const { onReady } = this.props

        this.initPreviewScrollBar()

        this.adjustment()

        this.initEvents()

        typeof onReady === 'function' && onReady()

        this.autoSaveContent()

    }
    componentWillUnmount() {
        /* this.scrollLockTimer && (
            clearTimeout(this.scrollLockTimer),
            this.scrollLockTimer = undefined
        ) */
        this.interval && (clearInterval(this.interval), this.interval = undefined)
        Scrollbar.destroyAll()
    }

    get html() {
        const { content } = this.state
        if (!content) {
            return ''
        }
        return this.markdown.render(content)
    }
    get htmlBytes() {
        return this.html.length
    }
    get htmlWords() {
        let html = (this.html || '').replace(/<[^>]*>/g, ' ')
        // 将回车换行符做特殊处理
        html = html.replace(/(\r\n+|\s+)/g, "龘")
        //处理英文字符数字，连续字母、数字、英文符号视为一个单词
        // eslint-disable-next-line
        html = html.replace(/[\x00-\xff]/g, "m")
        // 合并字符m，连续字母、数字、英文符号视为一个单词
        html = html.replace(/m+/g, "*")
        html = html.replace(/龘+/g, "")
        return html.length
    }
    get markdownBytes() {
        const { selection, content } = this.state
        return (selection || content || '').length
    }
    get markdownWords() {
        const { selection, content } = this.state
        return (selection || content || '').split(/[\s\n]+/).filter(Boolean).length
    }
    initEvents = () => {
        document.addEventListener('fullscreenchange', (event) => {
            if (isFullscreen()) {
                this.setState({ fullscreen: true })
            } else {
                this.setState({ fullscreen: false })
            }
        });
    }
    autoSaveContent() {
        const { saveInterval, autoSave } = this.state
        if (typeof saveInterval !== 'number' || saveInterval <= 0 || (autoSave !== true && typeof autoSave !== 'function')) {
            return
        }
        this.interval = setInterval(this.save, saveInterval)
    }
    getEditorInstance = instance => {
        if (instance) {
            this.editor = instance.editor
        }
    }
    initPreviewScrollBar() {
        const options = { damping: 0.1, alwaysShowTracks: true, continuousScrolling: true, renderByPixels: true }
        this.previewScrollbar = Scrollbar.init(this.previewWrapperRef, options)
        this.previewScrollbar.addListener(this.onPreviewScroll)
        Scrollbar.init(this.sideMainRef, options)
    }
    lockScrollBar = at => {
        this.scrollLocked = at
    }
    adjustment() {
        // 调整参数
        this.layout()

        resize(this.containerRef, () => {
            if (document.body.clientWidth <= 640) {
                this.setState({ livePreviewMode: false })
            }
            const newHeight = this.getMainHeight()
            if (this.state.height === newHeight) {
                return
            }
            this.layout()
        })
    }
    layout = () => {
        const height = this.getMainHeight()
        this.setState({ mainHeight: height })

        this.editor.setSize(null, height)
    }
    getValue() {
        return this.editor.getValue()
    }
    setValue = (content) => {
        this.editor.setValue(content)
    }
    saveAsHtml = filename => {

        filename = filename || this.state.filename || defaultFilename
        download({
            content: this.html,
            type: 'text/html; charset=utf-8',
            filename: filename + '.html'
        })
    }
    saveAsMarkdown = filename => {

        filename = filename || this.state.filename || defaultFilename
        download({
            content: this.getValue(),
            type: 'text/markdown; charset=utf-8',
            filename: filename + '.md'
        })
    }
    save = () => {
        const { autoSave } = this.state
        let save = null
        if (typeof autoSave === 'function') {
            save = autoSave
        }
        if (autoSave === true) {
            save = saveCache
        }
        save(this.getValue())
    }
    clean = () => {
        cleanCache()
    }
    getMainHeight() {
        // 获取Main 区域的高度
        const { height: containerHeight } = this.containerRef.getBoundingClientRect()
        const { height: toolBarsHeight } = this.toolBarsRef.getBoundingClientRect()
        const { height: statusHeight } = this.statusRef.getBoundingClientRect()
        return containerHeight - toolBarsHeight - statusHeight - 2
    }
    readOnly(isReadOnly = true) {
        this.setState({ readOnly: isReadOnly })
    }
    language = lng => {
        if (!lng) {
            return i18n.language
        }
        if (i18n.languages.indexOf(lng) === -1) {
            warn(`Language ${lng} is not support. maybe ${i18n.languages.join('? ')}? will work fine.`)
            return i18n.language
        }
        i18n.changeLanguage(lng)
    }
    syncScroll = () => {
        if (this.state.syncScroll) {
            const editorScrollInfo = this.editor.getScrollInfo()
            const editorTop = editorScrollInfo.top
            const editorScrollHeight = editorScrollInfo.height - editorScrollInfo.clientHeight
            const scale = (this.previewScrollbar.contentEl.offsetHeight - this.previewScrollbar.containerEl.offsetHeight) / editorScrollHeight

            if (this.scrollLocked === 1) {
                // left locked, scrolled by right
                this.editor.scrollTo(0, this.previewScrollbar.scrollTop / scale)
            } else if (this.scrollLocked === 2) {
                // right locked, scrolled by left
                this.previewScrollbar.scrollTo(0, editorTop * scale)
            }
        }
    }
    fullscreen = () => {
        if (isFullscreen()) {
            // this.setState({ fullscreen: false })
            exitFullscreen()
        } else {
            // this.setState({ fullscreen: true })
            launchFullscreen(this.containerRef)
        }
    }
    onDropPasteFiles = (e, files) => {
        const { file: uploadFile = {}, editorOptions } = this.state
        let { dragDrop = true, allowDropFileTypes } = editorOptions || {}

        const linkFiles = []

        const readTextFiles = (files || []).filter(file => {
            if (allowDropFileTypes && allowDropFileTypes.indexOf(file.type) === -1) {
                linkFiles.push(file)
                return false
            }

            if (uploadFile.alwaysUpload) {
                linkFiles.push(file)
            }
            return true
        })
        if (dragDrop && window.FileReader && window.File) {
            let len = readTextFiles.length
            let read = 0
            const text = Array(len)
            const markAsReadAndPasteIfAllFilesAreRead = () => {
                if (++read == len) {
                    const content = text.filter(function (t) { return t != null; }).join(this.editor.doc.lineSeparator())
                    const { line, ch } = this.editor.getCursor()
                    this.editor.replaceRange(content, { line, ch }, { line, ch })
                }
            }
            const readTextFromFile = (file, i) => {
                if (allowDropFileTypes && allowDropFileTypes.indexOf(file.type) === -1) {
                    return
                }

                const reader = new FileReader()
                reader.onerror = function () { }
                reader.onload = function () {
                    const content = reader.result;
                    // eslint-disable-next-line
                    if (/[\x00-\x08\x0e-\x1f]{2}/.test(content)) {
                        markAsReadAndPasteIfAllFilesAreRead()
                        return
                    }
                    text[i] = content;
                    markAsReadAndPasteIfAllFilesAreRead()
                };
                reader.readAsText(file);
            };
            readTextFiles.forEach((file, i) => {
                readTextFromFile(file, i)
            })

        }
        if (uploadFile && isFunction(uploadFile.upload)) {
            //
            fileUpload(linkFiles, uploadFile.upload).then(res => {
                const { images, files: links } = toMarkdownLink(res)
                const { line, ch } = this.editor.getCursor()
                if (images.length > 0) {
                    this.editor.replaceRange(images.join(' '), { line, ch }, { line, ch })
                }
                if (links.length > 0) {
                    this.editor.replaceRange(links.join(' '), { line, ch }, { line, ch })
                }
            })
        }
    }
    onToolBarsTogger = e => {
        e.preventDefault()
        this.setState(state => ({ toolBarsHidden: !state.toolBarsHidden }), () => {
            this.layout()
        })
    }
    onLivePreviewModeTogger = e => {
        e.preventDefault()
        this.setState(state => ({ livePreviewMode: !state.livePreviewMode }))
    }
    onPreviewModeTogger = e => {
        e.preventDefault()
        this.setState(state => ({ previewMode: !state.previewMode }))
    }
    onSyncScrollTogger = e => {
        e.preventDefault()
        this.setState(state => ({ syncScroll: !state.syncScroll }), () => {
            this.syncScroll()
        })
    }
    onStatusTogger = e => {
        e.preventDefault()
        this.setState(state => ({ statusHidden: !state.statusHidden }), () => {
            this.layout()
        })
    }
    onHelper = e => {
        // 阻止默认事件
        e.preventDefault()
        // 阻止冒泡
        e.stopPropagation()
        this.setState(state => ({ helper: !state.helper }))
    }
    onContainer = e => {
        // 阻止冒泡
        e.stopPropagation()
        this.setState({ helper: false })
    }
    onContainerKeyDown = e => {
        // 阻止默认事件
        // F1 help
        if (e.keyCode === 112) {
            e.preventDefault()
            this.onHelper(e)
            return
        }
        // Ctrl+S
        if (e.ctrlKey && e.keyCode === 83) {
            e.preventDefault()
            this.save()
            return
        }
        // Ctrl+Delete
        if (e.ctrlKey && e.keyCode === 46) {
            e.preventDefault()
            this.clean()
        }
        // fullscreen
        if (e.keyCode === 122) {
            e.preventDefault()
            this.fullscreen()
        }
    }
    onSideBar = e => {
        // 阻止冒泡
        e.stopPropagation()
    }
    onPreviewScroll = () => {
        if (this.scrollLocked === 1) {
            this.syncScroll()
        }
    }
    onEditorScroll = () => {
        if (this.scrollLocked === 2) {
            this.syncScroll()
        }
    }
    onChange = cm => {
        const content = cm.getValue()
        this.setState({ content })
        const { onChange } = this.props
        typeof onChange === 'function' && onChange(content, this.markdown.render(content))
    }
    onCursorActivity = (cm) => {
        const selection = cm.getSelection()
        const cursor = cm.getCursor()
        const row = cursor.line
        const col = cursor.ch
        const lineCount = selection ? selection.split(/\n/).length : cm.lineCount()
        this.setState({ selection, row, col, lineCount })
    }
    onPaste = (cm, e) => {
        if (e.clipboardData && e.clipboardData.files) {
            let files = [].slice.call(e.clipboardData.files || [])
            if (files.length > 0) {
                e.preventDefault()
                this.onDropPasteFiles(e, files)
            }
        }
    }
    onDrop = (cm, e) => {
        let files = [].slice.call(e.dataTransfer.files || [])
        if (files.length > 0) {
            e.preventDefault()
            this.onDropPasteFiles(e, files)
        }

    }
    render() {
        const {
            cssPrefix, editorRadius, toolBarsHidden, statusHidden, readOnly,
            previewMode, livePreviewMode, syncScroll, mainHeight, helper, toolbars = [],
            selection, row, col, lineCount, height, width, loading, fullscreen
        } = this.state
        const toolbarSize = toolbars.length
        return (
            <Spinner cssPrefix={cssPrefix} loading={loading}>
                <Translation i18n={i18n}>
                    {
                        t => (
                            <div
                                ref={ref => { this.containerRef = ref }}
                                key="editor-container"
                                className={`${cssPrefix}editor ${editorRadius ? 'radius' : ''} ${fullscreen ? 'fullscreen' : ''}`}
                                onClick={this.onContainer}
                                onKeyDown={this.onContainerKeyDown}
                                // onPaste={this.onPaste}
                                style={{ width: width || '100%', height: height || '96vh' }}
                            >
                                <div className={`${cssPrefix}panel`}>
                                    <div className={`${cssPrefix}panel ${cssPrefix}flex ${cssPrefix}flex--column`}>
                                        {/* ToolBars */}
                                        <div
                                            ref={ref => this.toolBarsRef = ref}
                                            className={`${cssPrefix}panel--navigation-bar ${toolBarsHidden ? `${cssPrefix}panel--navigation-bar--hidden` : ''}`}
                                        >
                                            <nav className={`${cssPrefix}navigation-bar ${cssPrefix}flex ${cssPrefix}flex--space-between ${cssPrefix}flex--row`}>
                                                <ul className={`${cssPrefix}navs`}>
                                                    {
                                                        !readOnly && toolbars.map((toolbarGroup, i) => {
                                                            const key = toolbarGroup.map(item => item.name).join('-')
                                                            return (
                                                                <React.Fragment key={key}>
                                                                    {
                                                                        toolbarGroup.map(toolbar => (
                                                                            <li key={toolbar.name}>
                                                                                <toolbar.component
                                                                                    ref={ref => { this.toolbarInstances[toolbar.name] = ref }}
                                                                                    editor={this.editor}
                                                                                    instance={this}
                                                                                    i18n={t}
                                                                                    options={this.state[toolbar.name]}
                                                                                    cssPrefix={cssPrefix}
                                                                                    toastr={toastr}
                                                                                />
                                                                            </li>
                                                                        ))
                                                                    }
                                                                    {
                                                                        i < toolbarSize - 1 ? (
                                                                            <li className="divider" unselectable="on">|</li>
                                                                        ) : null
                                                                    }
                                                                </React.Fragment>
                                                            )
                                                        })
                                                    }
                                                </ul>
                                                <ul className={`${cssPrefix}navs`}>
                                                    <li>
                                                        <a href="" title={t('help') + ' F1'} onClick={this.onHelper}>
                                                            <Question />
                                                        </a>
                                                    </li>
                                                </ul>
                                            </nav>
                                        </div>
                                        {/* ToolBars end*/}

                                        {/* Main Area */}
                                        <div
                                            ref={ref => { this.mainRef = ref }}
                                            className={`${cssPrefix}panel ${cssPrefix}panel--content ${cssPrefix}flex ${cssPrefix}flex--row`}
                                            style={{ height: mainHeight }}
                                        >
                                            {/* Editor Area  */}
                                            <div
                                                className={`${cssPrefix}panel--content-editor-wrap ${(previewMode || readOnly) ? `${cssPrefix}hidden` : ''}`}
                                                onMouseOver={e => this.lockScrollBar(2, e)}
                                            >
                                                <div className={`${cssPrefix}panel--content-editor-wrapper`}>
                                                    <ReactCodeMirror
                                                        options={this.state.editorOptions}
                                                        ref={this.getEditorInstance}
                                                        onPaste={this.onPaste}
                                                        onDrop={this.onDrop}
                                                        onScroll={this.onEditorScroll}
                                                        onChange={this.onChange}
                                                        onCursorActivity={this.onCursorActivity}
                                                    />
                                                </div>
                                            </div>
                                            {/* Editor Area  end */}

                                            {/* inner bars */}
                                            <div className={`${cssPrefix}panel--content-bars-wrap ${previewMode ? `${cssPrefix}hidden` : ''}`}>
                                                <div className={`${cssPrefix}panel--content-bars`}>
                                                    <div className={`${cssPrefix}panel--content-bars__inner-top`}>
                                                        <NavbarToggler
                                                            className={toolBarsHidden ? 'active' : ''}
                                                            title={t('toggle tool bar')}
                                                            onClick={this.onToolBarsTogger}
                                                        />
                                                        <Columns
                                                            className={`${livePreviewMode ? 'active' : ''} ${readOnly ? `${cssPrefix}hidden` : ''}`}
                                                            title={t('toggle live preview')}
                                                            onClick={this.onLivePreviewModeTogger}
                                                        />
                                                        <Eye
                                                            className={`${previewMode ? 'active' : ''} ${readOnly ? `${cssPrefix}hidden` : ''}`}
                                                            title={t('preview mode')}
                                                            onClick={this.onPreviewModeTogger}
                                                        />
                                                    </div>
                                                    <div className={`${cssPrefix}panel--content-bars__inner-bottom`}>
                                                        {/* <ModeToggler title={t('toggle focus mode')} /> */}
                                                        <ScrollSync
                                                            className={`${syncScroll ? 'active' : ''} ${readOnly ? `${cssPrefix}hidden` : ''}`}
                                                            title={t('toggle scroll sync')}
                                                            onClick={this.onSyncScrollTogger}
                                                        />
                                                        <StatusBarToggler
                                                            className={statusHidden ? 'active' : ''}
                                                            title={t('toggle status bar')}
                                                            onClick={this.onStatusTogger}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            {/* inner bars end */}

                                            {/* preview  */}
                                            <div
                                                className={`${cssPrefix}panel--content-preview-wrap ${!livePreviewMode ? previewMode ? '' : `${cssPrefix}hidden` : ''}`}
                                                onMouseOver={e => this.lockScrollBar(1, e)}
                                            >
                                                <div className={`${cssPrefix}preview-wrapper`}>
                                                    <div ref={ref => { this.previewWrapperRef = ref }} className={`${cssPrefix}preview-inner`}>
                                                        <div
                                                            className={`${cssPrefix}preview--content ${previewMode ? `${cssPrefix}preview--content-view-mode` : ''}`}
                                                            dangerouslySetInnerHTML={{ __html: this.html }}
                                                        />
                                                    </div>
                                                    <div className={`${cssPrefix}preview-corner ${previewMode ? '' : `${cssPrefix}hidden`}`}>
                                                        <Edit className="preview-icon" title={t('edit')} onClick={this.onPreviewModeTogger} />
                                                    </div>
                                                </div>
                                            </div>
                                            {/* preview  end */}


                                        </div>
                                        {/* Main Area end */}

                                        {/* status bars */}
                                        <div
                                            ref={ref => { this.statusRef = ref }}
                                            className={`${cssPrefix}panel ${cssPrefix}panel--status-bar ${statusHidden ? `${cssPrefix}panel--status-bar--hidden` : ''}`}
                                        >
                                            <div className={`${cssPrefix}stat-panel ${cssPrefix}flex ${cssPrefix}flex--row ${cssPrefix}flex--space-between`}>
                                                <div className={`${cssPrefix}stat-panel--left ${readOnly ? `${cssPrefix}hidden` : ''}`}>
                                                    <span>Markdown {selection ? t('selection') : ''} {this.markdownBytes} {t('bytes')}</span>
                                                    <span>{this.markdownWords} {t('words')}</span>
                                                    <span>{t('line count')} {lineCount}</span>
                                                    <span className="stat-bold">{row} {t('line')} {col} {t('col')}</span>
                                                </div>
                                                <div className={`${cssPrefix}stat-panel--right`}>
                                                    <span>HTML {this.htmlBytes} {t('bytes')}</span>
                                                    <span>{this.htmlWords} {t('words')}</span>
                                                </div>
                                            </div>
                                        </div>
                                        {/* status bars end */}
                                    </div>

                                    {/* side panel */}
                                    <div
                                        className={`${cssPrefix}panel ${cssPrefix}panel--side-bar ${helper ? '' : `${cssPrefix}panel--side-bar--hidden`}`}
                                        onClick={this.onSideBar}
                                    >
                                        <div className={`${cssPrefix}side-bar ${cssPrefix}flex ${cssPrefix}flex--column`}>
                                            {/* title */}
                                            <div className={`${cssPrefix}side-header ${cssPrefix}flex ${cssPrefix}flex--space-between ${cssPrefix}flex--row`}>
                                                <div className={`${cssPrefix}side-title`}>{t('help')}</div>
                                                <a href="" title={t('close')} onClick={this.onHelper}>
                                                    <Close />
                                                </a>
                                            </div>
                                            {/* title end */}

                                            {/* main */}
                                            <div ref={ref => { this.sideMainRef = ref }} className={`${cssPrefix}side-main`}>
                                                <div className={`${cssPrefix}side-inner`}>
                                                    <Helper i18n={t} cssPrefix={cssPrefix} />
                                                </div>
                                            </div>
                                            {/* main end */}
                                        </div>
                                    </div>
                                    {/* side panel end */}
                                </div>
                            </div>
                        )
                    }

                </Translation>
            </Spinner>
        )
    }
}
export default Editor