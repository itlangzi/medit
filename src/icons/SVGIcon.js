import * as React from 'react'
import * as PropTypes from 'prop-types'

class SVGIcon extends React.PureComponent {
    static propTypes = {
        cssName: PropTypes.string
    }
    render() {
        const { cssName, className, ...props } = this.props
        return (
            <span
                role="img"
                aria-label={cssName}
                className={`${process.env.CSS_PREDIX}icon ${process.env.CSS_PREDIX}icon${cssName ? `-${cssName}` : ''} ${className || ''}`}
                {...props}
            >
                <svg focusable="false" data-icon={cssName} viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" aria-hidden="true">
                    {this.props.children}
                </svg>
            </span>
        )
    }
}
export default SVGIcon