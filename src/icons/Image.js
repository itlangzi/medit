import React from 'react'
import SVGIcon from './SVGIcon'
class Image extends React.PureComponent {
    cssName = "image"
    render() {
        return (
            <SVGIcon cssName={this.cssName} {...this.props}>
                <path d="M937.814 41.726 86.28736 41.726c-44.7304 0-81.3199 33.2452-81.3199 78.0483l0 782.5664c0 44.802 36.5885 81.4653 81.3199 81.4653l858.312704 0c44.7304 0 77.951-36.6633 77.951-81.4653L1022.551064 119.774208C1022.55 74.9711 982.5454 41.726 937.814 41.726zM332.7898 157.5496c68.8886 0 124.7416 55.8049 124.7416 124.6454 0 68.8404-55.852 124.6454-124.7416 124.6454s-124.7416-55.8049-124.7416-124.6454C208.0481 213.3535 263.9002 157.5496 332.7898 157.5496zM119.508 885.0156c-9.3532 0-18.7791-3.2225-26.4356-9.815-17.0588-14.635-19.0454-40.3425-4.4104-57.4269l186.9906-281.855c13.8854-16.2345 37.9218-18.9491 55.1014-6.2269l164.9889 122.5349 295.6196-335.8177c14.0052-17.5677 88.2739-100.3162 131.7437-6.4686 0.0481-0.1454 0.0973 124.0873 0.1454 250.9363 0.0481 132.3039 0.0727 324.0182 0.0727 324.0182C922.4284 884.6746 119.895 885.0156 119.508 885.0156z"></path>
            </SVGIcon>
        )
    }
}

export default Image