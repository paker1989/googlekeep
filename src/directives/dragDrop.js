import util from '../util'

let diffX
let diffY
let originMarginLeft = 0
let originMarginTop = 0
let currentPositionX
let currentPositionY
let dragValidation
let rangeValidation

const dragDropClass = {
  drag: 'dragging',
}

function checkAllowDrag(node)
{
  const clientWidth = document.documentElement.clientWidth || document.body.clientWidth
  const clientHeight = document.documentElement.clientHeight || document.body.clientHeight
  const nodeWidth = Number.parseInt(util.getStyle(node, 'width'))
  const nodeHeight = Number.parseInt(util.getStyle(node, 'height'))

  // console.log(clientWidth +' s ' + clientHeight + ' d ' + nodeWidth + ' f ' + nodeHeight)
  return {
    allowX: !!(nodeWidth > clientWidth),
    allowY: !!(nodeHeight > clientHeight)
  }
}

function checkDragRange(node) {
  const clientWidth = document.documentElement.clientWidth || document.body.clientWidth
  const clientHeight = document.documentElement.clientHeight || document.body.clientHeight
  const offsetLeft = node.getBoundingClientRect().left
  const offsetTop = node.getBoundingClientRect().top
  const offsetRight = clientWidth - Number.parseInt(util.getStyle(node, 'width')) - offsetLeft
  const offsetBottom = clientHeight - Number.parseInt(util.getStyle(node, 'height')) - offsetTop

  // console.log(offsetLeft + ' s ' + offsetRight + ' d ' + offsetTop + ' f ' + offsetBottom)
  return {
    allowRangeLtR: offsetLeft <= 0,
    allowRangeRtL: offsetRight <= 0,
    allowRangeTtD: offsetTop <= 0,
    allowRangeDtT: offsetBottom <= 0,
  }
}

export default {
  bind(el, binding) {
    let dragging

    el.addEventListener('drag', (event) => {
      event.preventDefault()
    })

    el.addEventListener('mousedown', (event) => {
      dragging = el
      el.classList.add(dragDropClass.drag)
      diffX = event.clientX
      diffY = event.clientY
      dragValidation = checkAllowDrag(el)
    })

    el.addEventListener('mousemove', (event) => {
      event.preventDefault()

      if (dragging != null) {
        currentPositionX = event.clientX
        currentPositionY = event.clientY
        rangeValidation = checkDragRange(el)

        const dirConditionHor = (currentPositionX - diffX) > 0 ?
          rangeValidation.allowRangeLtR : rangeValidation.allowRangeRtL
        const dirConditionVer = (currentPositionY - diffY) > 0 ?
          rangeValidation.allowRangeTtD : rangeValidation.allowRangeDtT

        if (dragValidation && dragValidation.allowX && dirConditionHor) {
          el.style.marginLeft = (originMarginLeft + (currentPositionX - diffX)) + 'px'
        }
        if (dragValidation && dragValidation.allowY && dirConditionVer) {
          el.style.marginTop = (originMarginTop + (currentPositionY - diffY)) + 'px'
        }
      }
    })

    el.addEventListener('mouseup', () => {
      el.classList.remove(dragDropClass.drag)
      dragging = null
      originMarginLeft = Number.parseInt(el.style.marginLeft.split('px')[0]) || 0
      originMarginTop = Number.parseInt(el.style.marginTop.split('px')[0]) || 0
    })
  },

  update(el, binding) {

  },

  unbind() {
    console.log('unbind')
  }
}
