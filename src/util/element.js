export const resize = (el, callback) => {
    // const el = this.$el
    // scroll passive events
    let passiveEvents = false;
    try {
        Object.defineProperty({}, 'passive', {
            get: function () {
                passiveEvents = { passive: true }
                return passiveEvents
            }
        });
    } catch (e) {
        // ignore
    }
    // https://www.w3.org/TR/html/syntax.html#writing-html-documents-elements
    // https://blog.crimx.com/2017/07/15/element-onresize/
    // eslint-disable-next-line
    if (/^(area|base|br|col|embed|hr|img|input|keygen|link|menuitem|meta|param|source|track|wbr|script|style|textarea|title)$/i.test(el.tagName)) {
        throw new TypeError('Unsupported tag type. Change the tag or wrap it in a supported tag(e.g. div).');
    }
    /* if (typeof callback !== 'function') {
        throw new TypeError('Parameter "callback" is not of type "function".')
    } */
    let lastWidth = el.offsetWidth || 1;
    let lastHeight = el.offsetHeight || 1;
    let maxWidth = 10000 * lastWidth;
    let maxHeight = 10000 * lastHeight;
    let expand = document.createElement('div');
    // eslint-disable-next-line
    expand.style.cssText = 'position:absolute;top:0;bottom:0;left:0;right:0;z-index=-10000;overflow:hidden;visibility:hidden;';
    let shrink = expand.cloneNode(false);

    let expandChild = document.createElement('div');
    expandChild.style.cssText = 'transition:0s;animation:none;';
    let shrinkChild = expandChild.cloneNode(false)

    expandChild.style.width = maxWidth + 'px';
    expandChild.style.height = maxHeight + 'px';
    shrinkChild.style.width = '250%';
    shrinkChild.style.height = '250%';

    expand.appendChild(expandChild);
    shrink.appendChild(shrinkChild);
    el.appendChild(expand);
    el.appendChild(shrink);

    if (expand.offsetParent !== el) {
        el.style.position = 'relative';
    }

    expand.scrollTop = shrink.scrollTop = maxHeight;
    expand.scrollLeft = shrink.scrollLeft = maxWidth;

    let newWidth = 0;
    let newHeight = 0;
    function onResize() {
        if (newWidth !== lastWidth || newHeight !== lastHeight) {
            lastWidth = newWidth;
            lastHeight = newHeight;
            callback && callback({ width: lastWidth, height: lastHeight });
        }
    }

    function onScroll() {
        newWidth = el.offsetWidth || 1;
        newHeight = el.offsetHeight || 1;
        if (newWidth !== lastWidth || newHeight !== lastHeight) {
            requestAnimationFrame(onResize);
        }
        expand.scrollTop = shrink.scrollTop = maxHeight;
        expand.scrollLeft = shrink.scrollLeft = maxWidth;
    }

    expand.addEventListener('scroll', onScroll, passiveEvents);
    shrink.addEventListener('scroll', onScroll, passiveEvents);
}