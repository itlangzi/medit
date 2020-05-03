import React from 'react'
import icons from '@/icons'
import Addon from './Addon'
import { italic, hotKeys } from '../util'
class Italic extends Addon {
    constructor(props) {
        super(props)
        this.state = { ...this.state, a: 123 }
    }
    onRedo = e => {
        e.preventDefault()
        italic(this.props.editor)
    }
    render() {
        const { i18n } = this.props
        return (
            <a href="" title={i18n('italic') + ' ' + hotKeys.italic} onClick={this.onRedo}>
                <icons.Italic />
            </a>
        )
    }
}

export default Italic
export const name = 'italic'