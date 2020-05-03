import React from 'react'
import SVGIcon from './SVGIcon'
class Bold extends React.PureComponent {
    cssName = "bold"
    render() {
        return (
            <SVGIcon cssName={this.cssName} {...this.props}>
                <path d="M737.586 487.782c67.278-37.074 107.314-108.32 107.314-191.386 0-96.472-52.5-175.252-137.252-208.358C658.276 68.02 609.698 64 547.322 64H176c-17.674 0-32 14.326-32 32v66.098c0 17.674 14.326 32 32 32h66.226v637.06H176c-17.674 0-32 14.326-32 32V928c0 17.674 14.326 32 32 32h391.38c48.406 0 89.668-2.578 133.732-15.168C803.04 914.386 880 821.294 880 700.028c0-104.336-53.146-183.368-142.414-212.246zM412.434 201.618h134.888c32.588 0 55.072 4.038 75.05 13.434 31.656 16.958 49.812 53.004 49.812 98.892 0 70.058-40.64 113.58-106.058 113.58h-153.692V201.618z m225.284 610.95c-20.28 8.112-45.354 9.814-62.818 9.814h-162.466V563.886h168.734c79.29 0 126.114 50.76 126.114 126.114 0.002 56.85-27.32 104.966-69.564 122.568z"></path>
            </SVGIcon>
        )
    }
}

export default Bold