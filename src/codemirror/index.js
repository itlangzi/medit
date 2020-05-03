import React from 'react'
import PropTypes from 'prop-types'

import CodeMirror from 'codemirror'
import 'codemirror/addon/selection/active-line'
import 'codemirror/addon/selection/selection-pointer'
import 'codemirror/addon/selection/mark-selection'

import 'codemirror/addon/display/fullscreen'
import 'codemirror/addon/display/placeholder'
import 'codemirror/addon/display/autorefresh'

import 'codemirror/addon/hint/anyword-hint'
import 'codemirror/addon/hint/show-hint'

import 'codemirror/addon/fold/foldcode'
import 'codemirror/addon/fold/foldgutter'
import 'codemirror/addon/fold/brace-fold'
import 'codemirror/addon/fold/indent-fold'
import 'codemirror/addon/fold/markdown-fold'
import 'codemirror/addon/fold/comment-fold'

import 'codemirror/addon/comment/comment'

import 'codemirror/addon/edit/matchbrackets'

import 'codemirror/addon/scroll/simplescrollbars'

import 'codemirror/addon/search/search'
import 'codemirror/addon/search/searchcursor'
import 'codemirror/addon/search/jump-to-line'
import 'codemirror/addon/search/match-highlighter'
import 'codemirror/addon/search/matchesonscrollbar'

import 'codemirror/mode/meta'

import 'codemirror/mode/clike/clike'
import 'codemirror/mode/cmake/cmake'
import 'codemirror/mode/coffeescript/coffeescript'
import 'codemirror/mode/commonlisp/commonlisp'
import 'codemirror/mode/css/css'
import 'codemirror/mode/d/d'
import 'codemirror/mode/dart/dart'
import 'codemirror/mode/diff/diff'
import 'codemirror/mode/django/django'
import 'codemirror/mode/dockerfile/dockerfile'
import 'codemirror/mode/dtd/dtd'
import 'codemirror/mode/erlang/erlang'
import 'codemirror/mode/gfm/gfm'
import 'codemirror/mode/go/go'
import 'codemirror/mode/groovy/groovy'
import 'codemirror/mode/haml/haml'
import 'codemirror/mode/htmlembedded/htmlembedded'
import 'codemirror/mode/htmlmixed/htmlmixed'
import 'codemirror/mode/http/http'
import 'codemirror/mode/javascript/javascript'
import 'codemirror/mode/jsx/jsx'
import 'codemirror/mode/markdown/markdown'
import 'codemirror/mode/mbox/mbox'
import 'codemirror/mode/nginx/nginx'
import 'codemirror/mode/perl/perl'
import 'codemirror/mode/php/php'
import 'codemirror/mode/pig/pig'
import 'codemirror/mode/powershell/powershell'
import 'codemirror/mode/properties/properties'
import 'codemirror/mode/python/python'
import 'codemirror/mode/ruby/ruby'
import 'codemirror/mode/rust/rust'
import 'codemirror/mode/sass/sass'
import 'codemirror/mode/scheme/scheme'
import 'codemirror/mode/shell/shell'
import 'codemirror/mode/solr/solr'
import 'codemirror/mode/sql/sql'
import 'codemirror/mode/stex/stex'
import 'codemirror/mode/stylus/stylus'
import 'codemirror/mode/swift/swift'
import 'codemirror/mode/vb/vb'
import 'codemirror/mode/vbscript/vbscript'
import 'codemirror/mode/velocity/velocity'
import 'codemirror/mode/vue/vue'
import 'codemirror/mode/xml/xml'
import 'codemirror/mode/yaml/yaml'

import defaultOptions from './defaultOptions'
import { extend, lowercase } from '../util'
class ReactCodeMirror extends React.PureComponent {

    static propTypes = {
        // height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        options: PropTypes.object,
        // value: PropTypes.string,
        // width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    }
    static defaultProps = {
        // height: '100%',
        options: {},
        // value: '',
        // width: '100%',
    }
    constructor(props) {
        super(props)
        this.editor = null
        this.instance = null
        this.textAreaRef = null
    }
    componentDidMount() {
        const options = extend({}, defaultOptions, this.props.options)
        this.editor = CodeMirror.fromTextArea(this.textAreaRef, options)
        const events = this.getEventsFromProps()
        Object.keys(events).forEach(event => {
            this.editor.on(events[event], this.props[event])
        })

        const { value, width, height } = options

        // 初始化值
        this.editor.setValue(value || '')

        if (width || height) {
            // 设置尺寸
            this.editor.setSize(width, height);
        }
    }
    componentWillUnmount() {
        if (this.editor) {
            this.editor.toTextArea()
        }
    }
    setSize(width, height) {
        if (this.editor) {
            this.editor.setSize(width, height)
        }
    }
    getEventsFromProps() {
        const propNames = Object.keys(this.props)
        const eventNames = propNames.filter((prop) => {
            return /^on+/.test(prop)
        })
        const events = {}
        eventNames.forEach(ele => {
            events[ele] = lowercase(ele.slice(2))
        })

        return events
    }
    render() {
        return (
            <textarea ref={ref => { this.textAreaRef = ref }} />
        )
    }
}

export default ReactCodeMirror