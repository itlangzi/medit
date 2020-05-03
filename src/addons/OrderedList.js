import React from 'react'
import icons from '@/icons'
import Addon from './Addon'
import { orderedList, hotKeys } from '../util'
class OrderedList extends Addon {
    constructor(props) {
        super(props)
    }
    onOrderedList = e => {
        e.preventDefault()
        orderedList(this.props.editor)
    }
    render() {
        const { i18n } = this.props
        return (
            <a href="" title={i18n('ordered list') + ' ' + hotKeys.orderedList} onClick={this.onOrderedList}>
                <icons.OrderedList />
            </a>
        )
    }
}

export default OrderedList
export const name = 'ordered-list'