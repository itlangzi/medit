import React from 'react'
import SVGIcon from './SVGIcon'
class Undo extends React.PureComponent {
    cssName = "undo"
    render() {
        return (
            <SVGIcon cssName={this.cssName} {...this.props}>
                <path d="M76 463.7l294.8 294.9c19.5 19.4 52.8 5.6 52.8-21.9V561.5c202.5-8.2 344.1 59.5 501.6 338.3 8.5 15 31.5 7.9 30.6-9.3-30.5-554.7-453-571.4-532.3-569.6v-174c0-27.5-33.2-41.3-52.7-21.8L75.9 420c-12 12.1-12 31.6 0.1 43.7z"></path>
            </SVGIcon>
        )
    }
}

export default Undo