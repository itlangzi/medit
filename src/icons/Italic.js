import React from 'react'
import SVGIcon from './SVGIcon'
class Italic extends React.PureComponent {
    cssName = "italic"
    render() {
        return (
            <SVGIcon cssName={this.cssName} {...this.props}>
                <path d="M601.516 832h-67.698l124.184-640h81.45a32 32 0 0 0 31.408-25.874l12.484-64C787.198 82.368 772.068 64 751.936 64H432.47a32 32 0 0 0-31.408 25.874l-12.484 64C384.724 173.632 399.854 192 419.986 192h67.692l-124.18 640H284.556a32 32 0 0 0-31.408 25.87l-12.49 64C236.804 941.63 251.934 960 272.068 960h316.958a32 32 0 0 0 31.408-25.87l12.49-64c3.854-19.76-11.276-38.13-31.408-38.13z"></path>
            </SVGIcon>
        )
    }
}

export default Italic