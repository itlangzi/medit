import React from 'react'
import icons from '@/icons'
import Addon from './Addon'

import { hotKeys } from '../util'

class Fullscreen extends Addon {
    onFullscreen = e => {
        e.preventDefault()
        const { instance } = this.props
        instance.fullscreen()
    }
    render() {
        const { i18n } = this.props
        return (
            <a href="" title={i18n('fullscreen') + ' ' + hotKeys.fullscreen} onClick={this.onFullscreen} >
                <icons.Fullscreen />
            </a>
        )
    }
}

export default Fullscreen
export const name = 'fullscreen'