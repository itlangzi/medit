import React from 'react'
import SVGIcon from './SVGIcon'
class Heading extends React.PureComponent {
    cssName = "heading"
    render() {
        const { children, ...props } = this.props
        return (
            children ? (
                <span role="img" aria-label={this.cssName} className={`${process.env.CSS_PREDIX}icon ${process.env.CSS_PREDIX}icon-heading-bold`} {...props}>
                    {children}
                </span>

            ) : (
                    <SVGIcon cssName={this.cssName} {...this.props}>
                        <path d="M992 160V96c0-17.674-14.326-32-32-32H640c-17.674 0-32 14.326-32 32v64c0 17.674 14.326 32 32 32h75.242v256H308.758V192H384c17.674 0 32-14.326 32-32V96c0-17.674-14.326-32-32-32H64c-17.674 0-32 14.326-32 32v64c0 17.674 14.326 32 32 32h74.55v640H64c-17.674 0-32 14.326-32 32v64c0 17.674 14.326 32 32 32h320c17.674 0 32-14.326 32-32v-64c0-17.674-14.326-32-32-32h-75.242V576H715.24v256H640c-17.674 0-32 14.326-32 32v64c0 17.674 14.326 32 32 32h320c17.674 0 32-14.326 32-32v-64c0-17.674-14.326-32-32-32h-74.55V192H960c17.674 0 32-14.326 32-32z"></path>
                    </SVGIcon>
                )
        )
    }
}

export default Heading