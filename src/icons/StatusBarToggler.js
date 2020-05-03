import React from 'react'
import SVGIcon from './SVGIcon'

class StatusBarToggler extends React.PureComponent {
    cssName = "status-bar-toggler"
    render() {
        return (
            <SVGIcon cssName={this.cssName} {...this.props}>
                <path d="m900.000005,709.594425l-777.000052,0l0,-582.142876l777.000052,0m0,-116.428575l-777.000052,0c-61.272004,0 -111.000007,52.160002 -111.000007,116.428575l0,582.142876c0,64.326788 49.728003,116.428575 111.000007,116.428575l777.000052,0c61.327504,0 111.000007,-52.101787 111.000007,-116.428575l0,-582.142876c0,-64.268573 -49.672503,-116.428575 -111.000007,-116.428575z" />
                <rect height="105.999997" width="1006.000005" y="907.977068" x="9.999992" />
            </SVGIcon>
        )
    }
}
export default StatusBarToggler