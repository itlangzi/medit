import { bindHotkeys, betterTab } from '../util'
export default {
    mode: "gfm", // "text/x-markdown",
    extraKeys: {
        ...bindHotkeys(),
        'Tab': betterTab
    },

    // 开启拖拽，可编辑
    // dragDrop: true,
    // allowDropFileTypes: ['text/html', 'text/plain'],
    firstLineNumber: 1,
    indentUnit: 4,
    smartIndent: true,
    tabSize: 4,
    // 最大撤销次数
    undoDepth: 200,
    placeholder: '',
    // 点击高亮当前行
    styleActiveLine: true,

    // 行号
    lineNumbers: true,

    // 是否换行
    lineWrapping: true,

    // 在选择时是否显示光标，默认为false
    showCursorWhenSelecting: true,

    // 展开折叠
    foldGutter: true,
    // fixedGutter: true,
    matchBrackets: true,
    highlightFormatting: true,
    maxHighlightLength: Infinity,
    viewportMargin: Infinity,
    theme: "default",
    gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
    scrollbarStyle: "overlay",
    autofocus: true,
    coverGutterNextToScrollbar: true,
}