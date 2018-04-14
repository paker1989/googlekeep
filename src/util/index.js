import resourceIO from './resourceIO'

export default {
  resourceIO,
  getStyle: (node, styleProp) => {
    styleProp = styleProp.toLowerCase()

    if (node.style && node.style[styleProp]) {
      return node.style[styleProp]
    } else if (node.currentStyle) { // IE
      styleProp = styleProp.replace(/\-([a-z])([a-z]?)/ig, (s, a, b) => {
        return a.toUpperCase() + b.toLowerCase()
      })
      return node.currentStyle[styleProp];
    } else if (document.defaultView.getComputedStyle) {
      return document.defaultView.getComputedStyle(node, null).getPropertyValue(styleProp)
    }
  },
  getOffset: (el, dir) => {
    switch(dir) {
      case 'left':
        let offsetLeft = el.offsetLeft
        let parent = el.offsetParent

        if (parent != null) {
          offsetLeft += parent.offsetLeft
          parent = parent.offsetParent
          console.log(parent)
        }
        return offsetLeft
    }
    return 0
  }
}
