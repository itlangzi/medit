import React from 'react'
import icons from '@/icons'
import Addon from './Addon'
import Dropdown from '../components/dropdown'
import { heading, hotKeys } from '../util'
class Heading extends Addon {
    constructor(props) {
        super(props)
        this.list = Array.from({ length: 6 }, (item, index) => index + 1)
    }
    onHeading = e => {
        e.preventDefault()

    }
    onHeadingSelect = (e, h) => {
        heading(this.props.editor, h)
    }
    render() {
        const { i18n, cssPrefix } = this.props
        return (
            <Dropdown
                cssPrefix={cssPrefix}
                overlay={
                    <ul className={`${cssPrefix}heading-list`} >
                        <li onClick={e => this.onHeadingSelect(e, 0)}>
                            <h6 className={`${cssPrefix}flex ${cssPrefix}flex--space-between`}>
                                <span>{i18n('no heading')}</span>
                                <span className="hot-key">{hotKeys.heading0}</span>
                            </h6>
                        </li>
                        {
                            this.list.map(i => {
                                const HeadTag = 'h' + i
                                return (
                                    <li key={'heading-' + i} onClick={e => this.onHeadingSelect(e, i)}>
                                        <HeadTag className={`${cssPrefix}flex ${cssPrefix}flex--space-between`}>
                                            <span> {i18n('heading')} {i} </span>
                                            <span className="hot-key"> {hotKeys['heading' + i]} </span>
                                        </HeadTag>
                                    </li>
                                )
                            })
                        }
                    </ul>
                }
            >
                <a href="" title={i18n('heading')} onClick={this.onHeading}>
                    <icons.Heading />
                </a>
            </Dropdown>
        )
    }
}

export default Heading
export const name = 'heading'