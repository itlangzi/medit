import React from 'react'

class Dropdown extends React.PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            visible: false
        }
        this.timer = null
    }
    componentWillUnmount() {
        this.timer && (clearTimeout(this.timer), this.timer = null)
    }
    close = () => {
        this.setState({ visible: false })
    }
    onMouseLeave = (e) => {
        e.preventDefault()
        e.stopPropagation()
        this.timer && clearTimeout(this.timer)
        this.timer = setTimeout(() => {
            this.close()
        }, 200)
    }
    onMouseEnter = e => {
        e.preventDefault()
        e.stopPropagation()
        this.timer && clearTimeout(this.timer)
        this.setState({ visible: true })
    }
    onMenu = e => {
        e.preventDefault()
        e.stopPropagation()
        if (this.props.hiddenOnSelect === false) {
            return
        }
        this.close()
    }
    render() {
        const { cssPrefix = '', children, overlay, className, overlayClassName } = this.props
        const { visible } = this.state
        return (
            <div
                className={`${cssPrefix}dropdown ${className ? className : ''}`}
                onMouseLeave={this.onMouseLeave}
                onMouseEnter={this.onMouseEnter}
            >
                <div className="nav-item">
                    {children}
                </div>
                <div
                    className={`${cssPrefix}dropmenu ${overlayClassName ? overlayClassName : ''} ${visible ? `${cssPrefix}dropmenu-active` : ''}`}
                    onClick={this.onMenu}
                >
                    {overlay ? overlay : null}
                </div>
            </div>
        )
    }
}

export default Dropdown