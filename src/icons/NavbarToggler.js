import React from 'react'
import SVGIcon from './SVGIcon'
class NavbarToggler extends React.PureComponent {
    cssName = "navigation-bar-toggler"
    render() {
        return (
            <SVGIcon cssName={this.cssName} {...this.props} {...this.props}>
                <path d="m904.333313,351.40559l-788.666649,0l0,552.142849l788.666649,0m0,110.42857l-788.666649,0c-62.191999,0 -112.666664,-49.471999 -112.666664,-110.42857l0,-552.142849c0,-61.011785 50.474666,-110.42857 112.666664,-110.42857l788.666649,0c62.248332,0 112.666664,49.416785 112.666664,110.42857l0,552.142849c0,60.95657 -50.418332,110.42857 -112.666664,110.42857z" />
                <rect height="155.000015" width="1011.999985" y="3.023" x="3" />
            </SVGIcon>
        )
    }
}

export default NavbarToggler