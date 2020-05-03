import React from 'react'
import icons from '@/icons'
import Addon from './Addon'
class Redo extends Addon {
    constructor(props) {
        super(props)
        this.state = { ...this.state }
    }
    onRedo = e => {
        e.preventDefault()
        const { editor } = this.props
        editor.redo('redo')
    }
    render() {
        const { i18n } = this.props
        return (
            <a href="" title={i18n('redo')} onClick={this.onRedo}>
                <icons.Redo />
            </a>
        )
    }
}

export default Redo
export const name = 'redo'