import React from 'react'
import icons from '@/icons'
import Addon from './Addon'
import { bold, hotKeys } from '../util'
class Bold extends Addon {
    constructor(props) {
        super(props)
    }
    onBold = e => {
        e.preventDefault()
        bold(this.props.editor)
    }
    render() {
        const { i18n } = this.props
        return (
            <a href="" title={i18n('bold') + ' ' + hotKeys.bold} onClick={this.onBold} >
                <icons.Bold />
            </a>
        )
    }
}

export default Bold
export const name = 'bold'