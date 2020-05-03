import React from 'react'

import SVGIcon from './SVGIcon'

class ScrollSync extends React.PureComponent {
    cssName = "scroll-sync"
    render() {
        return (
            <SVGIcon cssName={this.cssName} {...this.props}>
                <path d="m321.5,816.400024l190.5,0l-254,203.600006l-254,-203.600006l190.5,0l0,-152.700005l127,0l0,152.700005zm508,0l190.5,0l-254,203.600006l-254,-203.600006l190.5,0l0,-152.700005l127,0l0,152.700005zm3.4925,-254.500008l-641.985,0l0,-101.800003l641.985,0l0,101.800003zm-511.4925,-203.600006l-127,0l0,-152.700005l-190.5,0l254,-203.600006l254,203.600006l254,-203.600006l254,203.600006l-190.5,0l0,152.700005l-127,0l0,-152.700005l-381,0l0,152.700005z" />
            </SVGIcon>
        )
    }
}

export default ScrollSync