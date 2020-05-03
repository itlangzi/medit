import React from 'react'

class Addon extends React.PureComponent {
    constructor(props) {
        super(props)
        // eslint-disable-next-line
        this.state = { disabled: false }
    }
    disabled(isDisabled = true) {
        // eslint-disable-next-line
        this.setState({ disabled: isDisabled || false })
    }
    getCursor() {
        return this.props.editor.getCursor()
    }
}
export default Addon