import React from 'react'
import SVGIcon from './SVGIcon'
class Upload extends React.PureComponent {
    cssName = 'upload'
    render() {
        return (
            <SVGIcon cssName={this.cssName}>
                <path d="M221.7 841.8c-20.2 0-36.6-16.4-36.6-36.6 0-20.2 16.4-36.6 36.6-36.6H806c20.2 0 36.6 16.4 36.6 36.6 0 20.2-16.4 36.6-36.6 36.6H221.7zM551.1 659.1c0 20.2-16.4 36.6-36.6 36.6-20.2 0-36.6-16.4-36.6-36.6V227.6c0-20.2 16.4-36.6 36.6-36.6 20.2 0 36.6 16.4 36.6 36.6v431.5z"></path>
                <path d="M511.9 270.9L247.3 536.7c-14.2 14.3-37.4 14.4-51.7 0.1-14.3-14.2-14.4-37.4-0.1-51.7l290.3-291.7c14.2-14.3 37.3-14.4 51.7-0.2l294.2 291.7c14.3 14.2 14.4 37.4 0.2 51.7-14.2 14.3-37.4 14.4-51.7 0.2L511.9 270.9z"></path>
            </SVGIcon>
        )
    }
}
export default Upload