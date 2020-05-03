export default {
    language: window.navigator.language || '',
    cssPrefix: process.env.CSS_PREDIX || '',
    markdownOptions: {
        plugins: null,
        highlight: null,

        link: {
            excludes: new window.URL(location.href).host,
            target: '_blank',
            relativeExclude: true
        }
    },
    container: null,
    // markdown: null,
    // editor: null,
    width: '100%',
    height: '96vh',
    // download: true,
    filename: 'Untitled',
    value: '',
    editorOptions: {
        placeholder: undefined,
    },
    editorRadius: true,

    toolbars: [
        ['undo', 'redo'],
        ['bold', 'strikethrough', 'italic', 'heading'],
        ['ordered-list', 'unordered-list', 'todo-list', 'blockquote', 'code'],
        ['table', 'hyperlink', 'image'],
        ['clear-cache', 'fullscreen']
    ],

    autoSave: true, // true | Function
    saveInterval: -1, // ms, -1 => Ctrl+S

    // markdown content
    // content: '',
    // format content
    // format: '',
    // 隐藏工具栏
    toolBarsHidden: false,
    // 滚动条同步
    syncScroll: true,
    // 隐藏状态栏
    statusHidden: false,
    // 实时预览模式
    livePreviewMode: document.body.clientWidth > 640,
    // 预览模式
    previewMode: false,

    // 只读模式
    readOnly: false,

    // 选中区域内容
    // selection: '',
    // 当前行/光标所在行
    // row: 0,
    // 光标所在列
    // col: 0,
    // 行数统计
    // lineCount: 0,
    // 帮助
    helper: false,

    fullscreen: false,
    //
    image: {
        upload(file) { }
    },
    file: {
        alwaysUpload: true,
        upload(files) {

        }
    }
}