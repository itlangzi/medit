import React from 'react'
import icons from '@/icons'
import Addon from './Addon'
import { blockquote } from '../util'
class BlockQuote extends Addon {
    constructor(props) {
        super(props)
    }
    onBlockQuote = e => {
        e.preventDefault()
        blockquote(this.props.editor)
    }
    render() {
        const { i18n } = this.props
        return (
            <a href="" title={i18n('blockquote')} onClick={this.onBlockQuote}>
                <icons.BlockQuote />
            </a>
        )
    }
}

export default BlockQuote
export const name = 'blockquote'