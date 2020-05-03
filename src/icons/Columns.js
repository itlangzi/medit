import React from 'react'
import SVGIcon from './SVGIcon'
class Columns extends React.PureComponent {
    cssName = "columns"
    render() {
        return (
            <SVGIcon cssName={this.cssName} {...this.props}>
                <path d="m455,1018.702105l-339,0c-62.376,0 -113,-50.560539 -113,-112.858345l0,-790.008415c0,-62.354236 50.624,-112.858345 113,-112.858345l791,0c62.4325,0 113,50.504109 113,112.858345l0,790.008415c0,62.297806 -50.5675,112.858345 -113,112.858345l-339,0l0,1.297871l-113,0l0,-1.297871zm0,-112.858345l0,-790.008415l-339,0l0,790.008415l339,0zm452,-790.008415l-339,0l0,790.008415l339,0l0,-790.008415z" />
            </SVGIcon>
        )
    }
}

export default Columns