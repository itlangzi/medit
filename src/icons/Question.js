import React from 'react'
import SVGIcon from './SVGIcon'
class Question extends React.PureComponent {
    cssName = "question"
    render() {
        return (
            <SVGIcon cssName={this.cssName} {...this.props}>
                <path d="m667.763114,472.567629l-45.600206,46.675308c-36.887765,36.815473 -59.713343,67.528935 -59.713343,143.804087l-101.899902,0l0,-25.425051c0,-56.138512 22.825578,-106.988613 59.713343,-143.804087l63.330789,-63.969428c18.392932,-18.407737 29.805721,-43.830753 29.805721,-71.900009c0,-56.138512 -45.600206,-101.700203 -101.899902,-101.700203c-56.248746,0 -101.900921,45.561691 -101.900921,101.700203l-101.899902,0c0,-112.326857 91.252382,-203.400406 203.800824,-203.400406c112.599392,0 203.799805,91.073549 203.799805,203.400406c0,44.748598 -18.138183,85.273586 -47.536304,114.61918zm-105.313549,393.879801l-101.899902,0l0,-101.700203l101.899902,0m-50.949951,-762.749488c-281.39658,0 -509.500531,227.655396 -509.500531,508.498981c0,280.895961 228.10395,508.501015 509.500531,508.501015c281.44753,0 509.499512,-227.605054 509.499512,-508.501015c0,-280.843585 -228.051981,-508.498981 -509.499512,-508.498981z" />
            </SVGIcon>
        )
    }
}

export default Question