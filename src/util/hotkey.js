import * as tools from "./editorKeys";
import { isPlatformWindows } from "./base";

const headingPattern = /^H(\d)$/
const handlePressHotkey = (type, editor) => {
    switch (type) {
        case "Bold":
            tools.bold(editor);
            break;
        case "Del":
            tools.strikethrough(editor);
            break;
        case "Italic":
            tools.italic(editor);
            break;
        case "Code":
            tools.blockCode(editor);
            break;
        case "InlineCode":
            tools.inlineCode(editor);
            break;
        case "H0":
        case "H1":
        case "H2":
        case "H3":
        case "H4":
        case "H5":
        case "H6":
            const h = Number(headingPattern.exec(type)[1])
            tools.heading(editor, h);
            break;
        case "UnorderedList":
            tools.unorderedList(editor)
            break;
        case "OrderedList":
            tools.orderedList(editor)
            break;
        case "TodoList":
            tools.todoList(editor)
            break;
        default:
            return;
    }
}

export const bindHotkeys = () =>
    isPlatformWindows
        ? {
            "Ctrl-B": (editor) => {
                handlePressHotkey("Bold", editor);
            },
            "Ctrl-U": (editor) => {
                handlePressHotkey("Del", editor);
            },
            "Ctrl-I": (editor) => {
                handlePressHotkey("Italic", editor);
            },
            "Ctrl-Alt-C": (editor) => {
                handlePressHotkey("Code", editor);
            },
            "`": (editor) => {
                handlePressHotkey("InlineCode", editor);
            },
            "Ctrl-Alt-V": (editor) => {
                handlePressHotkey("InlineCode", editor);
            },
            "Ctrl-Alt-0": (editor) => {
                handlePressHotkey("H0", editor);
            },
            "Ctrl-Alt-1": (editor) => {
                handlePressHotkey("H1", editor);
            },
            "Ctrl-Alt-2": (editor) => {
                handlePressHotkey("H2", editor);
            },
            "Ctrl-Alt-3": (editor) => {
                handlePressHotkey("H3", editor);
            },
            "Ctrl-Alt-4": (editor) => {
                handlePressHotkey("H4", editor);
            },
            "Ctrl-Alt-5": (editor) => {
                handlePressHotkey("H5", editor);
            },
            "Ctrl-Alt-6": (editor) => {
                handlePressHotkey("H6", editor);
            },
            "Shift-Ctrl-U": (editor) => {
                handlePressHotkey("UnorderedList", editor);
            },
            "Shift-Ctrl-O": (editor) => {
                handlePressHotkey("OrderedList", editor);
            },
            "Shift-Ctrl-C": (editor) => {
                handlePressHotkey("TodoList", editor);
            },
            /* "Ctrl-F": (editor) => {
                //
            }, */
        }
        : {
            "Cmd-B": (editor) => {
                handlePressHotkey("Bold", editor);
            },
            "Cmd-U": (editor) => {
                handlePressHotkey("Del", editor);
            },
            "Cmd-I": (editor) => {
                handlePressHotkey("Italic", editor);
            },
            "Cmd-Alt-C": (editor) => {
                handlePressHotkey("Code", editor);
            },
            "`": (editor) => {
                handlePressHotkey("InlineCode", editor);
            },
            "Cmd-Alt-V": (editor) => {
                handlePressHotkey("InlineCode", editor);
            },
            "Cmd-Alt-0": (editor) => {
                handlePressHotkey("H0", editor);
            },
            "Cmd-Alt-1": (editor) => {
                handlePressHotkey("H1", editor);
            },
            "Cmd-Alt-2": (editor) => {
                handlePressHotkey("H2", editor);
            },
            "Cmd-Alt-3": (editor) => {
                handlePressHotkey("H3", editor);
            },
            "Cmd-Alt-4": (editor) => {
                handlePressHotkey("H4", editor);
            },
            "Cmd-Alt-5": (editor) => {
                handlePressHotkey("H5", editor);
            },
            "Cmd-Alt-6": (editor) => {
                handlePressHotkey("H6", editor);
            },
            "Shift-Cmd-U": (editor) => {
                handlePressHotkey("UnorderedList", editor);
            },
            "Shift-Cmd-O": (editor) => {
                handlePressHotkey("OrderedList", editor);
            },
            "Shift-Cmd-C": (editor) => {
                handlePressHotkey("TodoList", editor);
            },
            /* "Cmd-F": (editor) => {
                //
            }, */
        };

export const hotKeys = isPlatformWindows
    ? {
        help: 'F1',
        codeFold: 'Ctrl+Q',
        bold: "Ctrl+B",
        del: "Ctrl+U",
        italic: "Ctrl+I",
        code: "Ctrl+Alt+C",
        inlineCode: "Ctrl+Alt+V",
        heading0: 'Ctrl+Alt+0',
        heading1: 'Ctrl+Alt+1',
        heading2: 'Ctrl+Alt+2',
        heading3: 'Ctrl+Alt+3',
        heading4: 'Ctrl+Alt+4',
        heading5: 'Ctrl+Alt+5',
        heading6: 'Ctrl+Alt+6',
        unorderedList: 'Ctrl+Shift+U',
        orderedList: 'Ctrl+Shift+O',
        todoList: 'Ctrl+Shift+C',
        search: "Ctrl+F",
        replace: "Ctrl+Shift+F",
        findPrevious: "Ctrl+Shift+G",
        replaceAll: "Ctrl+Shift+R",
        undo: "Ctrl+Z",
        redo: "Ctrl+Y",
        save: "Ctrl+S",
        clear: "Ctrl+Delete",
        fullscreen: "F11"
    }
    : {
        help: 'F1',
        codeFold: '⌘Q',
        bold: "⌘B",
        del: "⌘U",
        italic: "⌘I",
        code: "⌥⌘C",
        inlineCode: "⌥⌘V",
        heading0: '⌥⌘0',
        heading1: '⌥⌘1',
        heading2: '⌥⌘2',
        heading3: '⌥⌘3',
        heading4: '⌥⌘4',
        heading5: '⌥⌘5',
        heading6: '⌥⌘6',
        unorderedList: 'Shift⌘U',
        orderedList: 'Shift⌘O',
        todoList: 'Shift⌘C',
        search: "⌘F",
        replace: "Shift⌘F",
        findPrevious: "Shift⌘G",
        replaceAll: "Shift⌘R",
        undo: "⌘Z",
        redo: "⌘Y",
        save: "⌘S",
        clear: "⌘Delete",
        fullscreen: "F11"
    };

export const betterTab = cm => {
    if (cm.somethingSelected()) {
        cm.indentSelection("add");
    } else {
        cm.replaceSelection(
            cm.getOption("indentWithTabs") ? "\t" : Array(cm.getOption("indentUnit") + 1).join(" "),
            "end",
            "+input",
        );
    }
};
