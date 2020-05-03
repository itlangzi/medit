import React from 'react'
import SVGIcon from './SVGIcon'
class Redo extends React.PureComponent {
    cssName = "redo"
    render() {
        return (
            <SVGIcon cssName={this.cssName} {...this.props}>
                <path d="M1017.173333 430.08l-477.866666-307.2c-6.826667-3.413333-13.653333-3.413333-17.066667 0-6.826667 3.413333-10.24 6.826667-10.24 13.653333v187.733334C170.666667 334.506667 3.413333 662.186667 0 887.466667v3.413333c0 6.826667 6.826667 13.653333 17.066667 13.653333s17.066667-6.826667 17.066666-17.066666c3.413333-51.2 228.693333-279.893333 477.866667-290.133334V785.066667c0 6.826667 3.413333 13.653333 10.24 13.653333 6.826667 3.413333 13.653333 3.413333 17.066667 0l477.866666-341.333333c3.413333-3.413333 6.826667-10.24 6.826667-13.653334s-3.413333-10.24-6.826667-13.653333z"></path>
            </SVGIcon>
        )
    }
}

export default Redo