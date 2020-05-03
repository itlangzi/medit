import React from 'react'
import SVGIcon from './SVGIcon'
class CheckList extends React.PureComponent {
    cssName = "check-list"
    render() {
        return (
            <SVGIcon cssName={this.cssName} {...this.props}>
                <path d="m966.276294,185.99996l-570.410374,0c-27.961292,0 -50.330327,-24.45 -50.330327,-54.333333s22.369035,-54.333333 50.330327,-54.333332l567.614245,0c27.961292,0 50.330327,24.45 50.330327,54.333332c2.796129,29.883333 -19.572905,54.333333 -47.534198,54.333333zm0,380.333329l-570.410374,0c-27.961292,0 -50.330327,-24.45 -50.330327,-54.333333s22.369035,-54.333333 50.330327,-54.333333l567.614245,0c27.961292,0 50.330327,24.45 50.330327,54.333333c2.796129,29.883333 -19.572905,54.333333 -47.534198,54.333333zm0,380.333327l-570.410374,0c-27.961292,0 -50.330327,-24.45 -50.330327,-54.333332s22.369035,-54.333333 50.330327,-54.333333l567.614245,0c27.961292,0 50.330327,24.45 50.330327,54.333333c2.796129,29.883333 -19.572905,54.333333 -47.534198,54.333332zm-788.508458,-108.666665l0,108.666665l-111.845171,0l0,-108.666665l111.845171,0m55.922586,-54.333333l-223.690343,0l0,217.333331l223.690343,0l0,-217.333331zm-55.922586,-706.333323l0,108.666665l-111.845171,0l0,-108.666665l111.845171,0m55.922586,-54.333333l-223.690343,0l0,217.333331l223.690343,0l0,-217.333331zm0,407.499994c0,-16.3 -11.184517,-27.166666 -27.961294,-27.166666c-8.388388,0 -16.776776,5.433334 -22.369033,13.583332l-92.272266,135.833332l-30.757423,-29.883333c-8.388388,-8.15 -13.980647,-10.866666 -22.369035,-10.866666c-16.776776,0 -27.961292,10.866666 -27.961292,27.166666c0,8.15 2.796129,13.583334 8.388388,19.016667l55.922586,54.333332c5.592259,5.433334 11.184517,8.15 19.572905,8.15s16.776776,-5.433334 22.369035,-13.583332l111.845171,-162.999998c2.796129,-2.716666 5.592259,-8.15 5.592259,-13.583334z" />
            </SVGIcon>
        )
    }
}

export default CheckList