import React from 'react'
import icons from '@/icons'
import Addon from './Addon'
import Dropdown from '../components/dropdown'

class Table extends Addon {
    constructor(props) {
        super(props)
        this.state = { ...this.state, row: 0, col: 0, width: 18, height: 18 }
    }
    onTable = e => {
        e.preventDefault()
    }
    onSelected = e => {
        const { row = 0, col = 0 } = this.getRowCols(e)
        const tables = []
        tables.push(('|' + ' '.repeat(8)).repeat(col) + '|')
        tables.push(('|' + '-'.repeat(8)).repeat(col) + '|')
        for (let i = 0; i < row; i++) {
            tables.push(('|' + ' '.repeat(8)).repeat(col) + '|')
        }
        const { editor } = this.props
        const { line, ch } = this.getCursor()
        editor.replaceRange(tables.join('\n'), { line, ch }, { line, ch })
    }
    onMouseMove = e => {
        this.setState(this.getRowCols(e))
    }
    getRowCols(e) {
        const { left, top } = e.target.getBoundingClientRect()
        const col = Math.max(Math.ceil((e.pageX - left) / 18), 0)
        const row = Math.max(Math.ceil((e.pageY - top) / 18), 0)
        return { row, col, width: col * 18, height: row * 18 }
    }
    render() {
        const { i18n, cssPrefix } = this.props
        const { row, col, width, height } = this.state
        return (
            <Dropdown
                cssPrefix={cssPrefix}
                overlay={
                    <div className={`${cssPrefix}table-box`}>
                        <div
                            className={`${cssPrefix}table-box-unselected`}
                            onMouseMove={this.onMouseMove}
                            onClick={this.onSelected}
                        />
                        <div
                            className={`${cssPrefix}table-box-selected`}
                            style={{ width: width + 'px', height: height + 'px' }}
                            onMouseMove={this.onMouseMove}
                            onClick={this.onSelected}
                        />
                        <div className={`${cssPrefix}table-box-size`}>
                            {i18n('table')}: {row} x {col}
                        </div>
                    </div>
                }
            >
                <a href="" title={i18n('table')} onClick={this.onTable}>
                    <icons.Table />
                </a>
            </Dropdown>
        )
    }
}

export default Table
export const name = 'table'