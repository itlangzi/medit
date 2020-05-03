import React from 'react'
import ReactDOM from 'react-dom'
import Editor from './Editor'
import { isFunction } from './util'
//codemirror-pastel-on-dark
// diff-match-patch
// https://juejin.im/entry/57b2c47b1532bc00618cf288
class SmartEditor {
    constructor(options = {}) {
        this.options = Object.assign({}, options)
        this.ref = null
        return new Proxy(this, {
            get(target, property, receiver) {
                if (target[property]) {
                    return target[property]
                }
                return Reflect.get(target.ref, property, receiver)
            }
        })
    }
    onChange(callback) {
        if (typeof callback === 'function') {
            this.options.onChange = callback
        }
        return this
    }
    render(container, callback) {
        if (isFunction(container)) {
            callback = container
            container = undefined
        }
        container = container || this.options.container
        if (!container) {
            throw new Error('Container is required.')
        }
        let node = null
        if (container instanceof HTMLElement) {
            node = container
        } else {
            node = document.querySelector(String(container))
            if (!node) {
                throw new Error(`Container not found, document.querySelector: ${container}`)
            }
        }
        if (!callback) {
            callback = () => { }
        }
        const newOptions = { ...this.options, container: node }
        if (module.hot) {
            module.hot.accept('./Editor', function () {
                const Component = require('./Editor').default
                ReactDOM.render((
                    <Component
                        ref={ref => { this.editorRef = ref }}
                        onChange={this.onChange}
                        onReady={this.options.onReady}
                        options={newOptions}
                    />
                ), node, callback)
            })
        }
        ReactDOM.render((
            <Editor
                ref={ref => { this.ref = ref }}
                onChange={this.onChange}
                onReady={this.options.onReady}
                options={newOptions}
            />
        ), node, callback)
    }
}

export default SmartEditor