import React from 'react'
import SVGIcon from './SVGIcon'

class ClearCache extends React.PureComponent {
    cssName = "clear"
    render() {
        return (
            <SVGIcon cssName={this.cssName} {...this.props}>
                <path d="M924 266.6H100.7c-20.2 0-37.1 16.5-36.7 36.7 0.4 19.6 16.3 35.3 36 35.3h148.8V924c0 19.9 16.1 36 36 36h454.3c19.9 0 36-16.1 36-36V338.6h148.1c20.2 0 37.1-16.5 36.7-36.7-0.3-19.6-16.3-35.3-35.9-35.3zM703.2 888H320.8V338.6h78v343.3c0 19.9 16.1 36 36 36s36-16.1 36-36V338.6h82.3v343.3c0 19.9 16.1 36 36 36s36-16.1 36-36V338.6h78V888zM322.3 176h379.3c19.9 0 36-16.1 36-36s-16.1-36-36-36H322.3c-19.9 0-36 16.1-36 36s16.2 36 36 36z"></path>
            </SVGIcon>
        )
    }

}

export default ClearCache