import React from 'react'
import icons from '@/icons'
import Addon from './Addon'

import { hotKeys } from '../util'
class Clear extends Addon {
    onClearCache = e => {
        e.preventDefault()
        const { instance } = this.props
        instance.clean()
    }
    render() {
        const { i18n } = this.props
        return (
            <a href="" title={i18n('clear cache') + ' ' + hotKeys.clear} onClick={this.onClearCache} >
                <icons.ClearCache />
            </a>
        )
    }
}

export default Clear
export const name = 'clear-cache'