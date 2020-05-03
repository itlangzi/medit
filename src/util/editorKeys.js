
import { trim, isPlatformWindows } from '../util'
const lineBreak = isPlatformWindows ? "\r\n" : "\n"

const blockquoteReg = /^\s*>\s*/
const boldReg = /^\*\*([\s\S]{0,})\*\*$/
const strikethroughReg = /^~~([\s\S]{0,})~~$/
const italicReg = /^\*([\s\S]{0,})\*$/
const listReg = /^\s*((\d+\.)|-)(\s\[(x|\s)\])?\s+/i
const blockCodeReg = /^```([\s\S]{0,})```$/
const inlineCodeReg = /^`([\s\S]{0,})`$/
const headingReg = /^(\s*#{0,6}\s*)/
const orderedListReg = /^\s*\d+\.\s+/
const unorderedListReg = /^\s*-\s+/
const todoListReg = /^\s*((\d+\.)|-)\s\[(x|\s)\]\s+/i

const inlineHandle = (editor, replaceRegexp, wrapChars) => {
    let selection = editor.getSelection()
    const cursor = editor.getCursor()
    let offset = 0
    const chars = selection.length
    if (replaceRegexp.test(selection)) {
        selection = selection.replace(replaceRegexp, '$1')
        offset -= chars - selection.length
    } else {
        selection = wrapChars + selection + wrapChars
        offset += wrapChars.length
    }
    editor.replaceSelection(selection)
    cursor.ch = cursor.ch + offset
    editor.setCursor(cursor)
    editor.focus()
}

const blockHandle = (editor, replaceRegexp, wrapChars) => {
    const cursor = editor.getCursor()
    let selection = editor.getSelection()
    if (!selection) {
        // 获取当前行
        selection = editor.getLine(cursor.line) || ''
        editor.setSelection({ line: cursor.line, ch: 0 }, { line: cursor.line, ch: selection.length })
        cursor.ch = 0
    }
    const selections = selection.split(lineBreak) || []
    let has = selections.length > 0 && replaceRegexp.test(selections[0]) ? true : false
    selection = selections.map(sel => has ? sel.replace(replaceRegexp, '') : wrapChars + sel).join(lineBreak)
    /* if (cursor.ch > 0) {
        selection = lineBreak + selection
    } */
    editor.replaceSelection(selection)
    editor.setCursor(cursor)
    editor.focus()
}

const listHandle = (editor, replaceRegexp, wrapChars = '') => {
    const cursor = editor.getCursor()
    let selection = editor.getSelection()
    if (!selection) {
        // 获取当前行
        selection = editor.getLine(cursor.line) || ''
        editor.setSelection({ line: cursor.line, ch: 0 }, { line: cursor.line, ch: selection.length })
        cursor.ch = 0
    }
    const selections = selection.split(lineBreak)
    const has = selections.length > 0 && replaceRegexp.test(selections[0]) ? true : false
    selection = selections.map((sel, i) => {
        if (has) {
            return sel.replace(listReg, '')
        }
        if (wrapChars === true) {
            return (i + 1) + '. ' + sel.replace(listReg, '')
        }
        return wrapChars + sel.replace(listReg, '')
    }).join(lineBreak)
    /* if (cursor.ch > 0) {
        selection = lineBreak + selection
    } */
    editor.replaceSelection(selection)
    editor.setCursor(cursor)
    editor.focus()
}

export const blockquote = editor => {
    blockHandle(editor, blockquoteReg, '> ')
}
export const bold = editor => {
    inlineHandle(editor, boldReg, '**')
}
export const strikethrough = editor => {
    inlineHandle(editor, strikethroughReg, '~~')
}

export const italic = editor => {
    inlineHandle(editor, italicReg, '*')
}

export const blockCode = editor => {
    const cursor = editor.getCursor()
    let selection = editor.getSelection()
    if (!selection) {
        // 获取当前行
        selection = editor.getLine(cursor.line) || ''
        editor.setSelection({ line: cursor.line, ch: 0 }, { line: cursor.line, ch: selection.length })
        cursor.ch = 0
    }
    const regexp = blockCodeReg
    if (regexp.test(selection)) {
        selection = selection.replace(regexp, '$1')
    } else {
        selection = lineBreak + '```' + lineBreak + selection + lineBreak + '```' + lineBreak
    }
    /* if (cursor.ch > 0) {
        selection = lineBreak + selection
    } */
    editor.replaceSelection(selection)
    editor.setCursor(cursor)
    editor.focus()
}

export const inlineCode = editor => {
    inlineHandle(editor, inlineCodeReg, '`')
}

export const heading = (editor, h) => {
    const cursor = editor.getCursor()
    let selection = editor.getSelection()
    if (!selection) {
        // 获取当前行
        selection = editor.getLine(cursor.line) || ''
        editor.setSelection({ line: cursor.line, ch: 0 }, { line: cursor.line, ch: selection.length })
        cursor.ch = 0
    }
    if (h < 0) {
        h = 0
    }
    if (h > 6) {
        h = 6
    }
    const wrapChars = '#'.repeat(h)
    const reg = headingReg
    const selections = selection.split(lineBreak) || []
    const has = selections.length > 0 && reg.test(selections[0]) && trim(reg.exec(selections[0])[1]) === wrapChars ? true : false
    selection = selections.map(sel => {
        if (h === 0) {
            return sel.replace(reg, '')
        }
        if (has) {
            return sel.replace(reg, '')
        }
        return wrapChars + ' ' + sel.replace(reg, '')
    }).join(lineBreak)
    /* if (cursor.ch > 0) {
        selection = lineBreak + selection
    } */
    editor.replaceSelection(selection)
    editor.setCursor(cursor)
    editor.focus()
}


export const orderedList = editor => {
    listHandle(editor, orderedListReg, true)
}
export const unorderedList = editor => {
    listHandle(editor, unorderedListReg, '- ')
}
export const todoList = editor => {
    listHandle(editor, todoListReg, '- [ ] ')
}