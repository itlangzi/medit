import React from 'react'
import SVGIcon from './SVGIcon'
class Close extends React.PureComponent {
    cssName = "close"
    render() {
        return (
            <SVGIcon cssName={this.cssName} {...this.props}>
                <path d="m1016.999985,107.023567l-101.922856,-102.023567l-404.077137,404.47641l-404.077137,-404.47641l-101.922856,102.023567l404.077137,404.47641l-404.077137,404.47641l101.922856,102.023567l404.077137,-404.47641l404.077137,404.47641l101.922856,-102.023567l-404.077137,-404.47641l404.077137,-404.47641z" />
            </SVGIcon>
        )
    }
}

export default Close