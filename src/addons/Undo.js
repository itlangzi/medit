import React from 'react'
import icons from '@/icons'
import Addon from './Addon'
class Undo extends Addon {
    constructor(props) {
        super(props)
        this.state = { ...this.state }
    }
    onUndo = e => {
        e.preventDefault()
        const { editor } = this.props
        editor.undo()
    }
    render() {
        const { i18n } = this.props
        return (
            <a href="" title={i18n('undo')} onClick={this.onUndo}>
                <icons.Undo />
            </a>
        )
    }
}

export default Undo
export const name = 'undo'