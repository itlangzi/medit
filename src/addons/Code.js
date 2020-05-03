import React from 'react'
import icons from '@/icons'
import Addon from './Addon'

import { inlineCode, hotKeys } from '../util'

class Code extends Addon {
    constructor(props) {
        super(props)
    }
    onCode = e => {
        e.preventDefault()
        inlineCode(this.props.editor)
    }
    render() {
        const { i18n } = this.props
        return (
            <a href="" title={i18n('code') + ' ' + hotKeys.inlineCode} onClick={this.onCode}>
                <icons.Code />
            </a>
        )
    }
}

export default Code
export const name = 'code'