import React from 'react'

import icons from '@/icons'
import PropTypes from 'prop-types'
class Modal extends React.PureComponent {
    static propTypes = {
        cssPrefix: PropTypes.string,
        destoryOnClose: PropTypes.func,
        mask: PropTypes.bool,
        maskClosable: PropTypes.bool,
        onClose: PropTypes.func,
        title: PropTypes.string,
        visible: PropTypes.bool,
    }
    static defaultProps = {
        cssPrefix: process.env.CSS_PREFIX || '',
        destoryOnClose() { },
        mask: true,
        maskClosable: true,
        onClose() { },
        title: '',
        visible: false
    }
    constructor(props) {
        super(props)
        this.state = { x: 0, y: 0, elX: 0, elY: 0 }
        this.modalRef = null
    }
    componentDidMount() {
        // document.addEventListener('click', this.onClose)
    }
    event(event) {
        if (!event) {  // 兼容IE浏览器
            event = window.event;
            event.target = event.srcElement;
            event.layerX = event.offsetX;
            event.layerY = event.offsetY;
        }
        const x = event.pageX || event.clientX + document.body.scrollLeft;
        // 计算鼠标指针的x轴距离
        const y = event.pageY || event.clientY + document.body.scrollTop;
        // 计算鼠标指针的y轴距离
        return { x, y }  // 返回标准化的事件对象
    }
    onModal = e => {
        e.stopPropagation()
    }
    onMask = e => {
        const { maskClosable } = this.props
        if (maskClosable === false) {
            return
        }
        this.onClose()
    }
    onClose = e => {
        typeof this.props.onClose === 'function' && this.props.onClose()
    }
    onModalMouseDown = (e) => {
        const { x, y } = this.event(e)
        const el = this.modalRef
        const elX = parseInt(el.offsetLeft);  // 拖放元素的x轴坐标
        const elY = parseInt(el.offsetTop);  // 拖放元素的y轴坐标
        this.setState({ x, y, elX, elY }, () => {
            document.addEventListener('mousemove', this.onModalMove)
            document.addEventListener('mouseup', this.onModalUp)
        })
    }
    onModalMove = e => {
        // e = this.event(e)
        const { x: ox, y: oy } = this.event(e)
        const { x, y, elX, elY } = this.state
        const el = this.modalRef
        let offsetTop = elY + oy - y
        offsetTop = offsetTop < 0 ? 0 : offsetTop
        el.style.left = elX + ox - x + 'px'
        el.style.top = offsetTop + 'px'
    }
    onModalUp = e => {
        document.removeEventListener('mousemove', this.onModalMove)
        document.removeEventListener('mouseup', this.onModalUp)
    }
    render() {
        const { visible, cssPrefix, title = '', destoryOnClose, mask } = this.props
        return destoryOnClose && !visible ? '' : (
            // < !--Modal -- >
            <>
                {
                    mask ? (
                        <div
                            className={`${cssPrefix}modal-backdrop fade ${visible ? 'show' : ''}`}
                            onClick={this.onMask}
                        />
                    ) : null
                }

                <div
                    className={`${cssPrefix}modal fade ${visible ? 'show' : ''}`}
                    tabIndex="-1"
                    role="dialog"
                    aria-labelledby="exampleModalCenterTitle"
                    aria-hidden="true"
                    ref={ref => { this.modalRef = ref }}
                    onClick={this.onModal}
                >
                    <div className={`${cssPrefix}modal-dialog`} role="document">
                        <div className={`${cssPrefix}modal-content`}>
                            <div className={`${cssPrefix}modal-header`}>
                                <div
                                    className={`${cssPrefix}modal-title`}
                                    onMouseDown={this.onModalMouseDown}
                                // onMouseMove={this.onModalMove}
                                >
                                    <div title={title}>{title}</div>
                                </div>
                                <div className={`${cssPrefix}modal-close`}>
                                    <icons.Close onClick={this.onClose} />
                                </div>
                            </div>
                            <div className={`${cssPrefix}modal-body`}>
                                {this.props.children}
                            </div>
                            {/* <div className={`${cssPrefix}modal-footer`}>
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-primary">Save changes</button>
                            </div> */}
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default Modal