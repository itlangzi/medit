import React from 'react'
import icons from '@/icons'
import Addon from './Addon'
import * as editorKeys from '../util/editorKeys'
class Strikethrough extends Addon {
    constructor(props) {
        super(props)
        this.state = { ...this.state, a: 'strikethrough' }
    }
    onStrikethrough = e => {
        e.preventDefault()
        editorKeys.strikethrough(this.props.editor)
    }
    render() {
        const { i18n } = this.props
        return (
            <a href="" title={i18n('strikethrough')} onClick={this.onStrikethrough}>
                <icons.Strikethrough />
            </a>
        )
    }
}

export default Strikethrough
export const name = 'strikethrough'