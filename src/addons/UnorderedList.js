import React from 'react'
import icons from '@/icons'
import Addon from './Addon'

import { unorderedList, hotKeys } from '../util'
class UnorderedList extends Addon {
    constructor(props) {
        super(props)
    }
    onUnOrderedList = e => {
        e.preventDefault()
        unorderedList(this.props.editor)
    }
    render() {
        const { i18n } = this.props
        return (
            <a href="" title={i18n('ordered list') + ' ' + hotKeys.unorderedList} onClick={this.onUnOrderedList}>
                <icons.UnorderedList />
            </a>
        )
    }
}

export default UnorderedList
export const name = 'unordered-list'