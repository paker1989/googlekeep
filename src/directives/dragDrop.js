import util from '../util'

let diffX
let diffY
let originMarginLeft = 0
let originMarginTop = 0
let currentPositionX
let currentPositionY
let dragValidation

const dragDropClass = {
  drag: 'dragging',
}

function checkAllowDrag(node)
{
  const clientWidth = document.documentElement.clientWidth || document.body.clientWidth
  const clientHeight = document.documentElement.clientHeight || document.body.clientHeight
  const nodeWidth = Number.parseInt(util.getStyle(node, 'width'))
  const nodeHeight = Number.parseInt(util.getStyle(node, 'height'))
  console.log(clientWidth +' s ' + clientHeight + ' d ' + nodeWidth + ' f ' + nodeHeight)

  return {
    allowX: !!(nodeWidth > clientWidth),
    allowY: !!(nodeHeight > clientHeight)
  }
}

export default {
  bind(el, binding) {
    let dragging
    dragValidation = checkAllowDrag(el)
    el.addEventListener('drag', (event) => {
      event.preventDefault()
    })

    el.addEventListener('mousedown', (event) => {
      dragging = el
      el.classList.add(dragDropClass.drag)
      diffX = event.clientX
      diffY = event.clientY
      checkAllowDrag(el)
    })

    el.addEventListener('mousemove', (event) => {
      event.preventDefault()
      if (dragging != null) {
        currentPositionX = event.clientX
        currentPositionY = event.clientY

        if (dragValidation.allowX) {
          el.style.marginLeft = (originMarginLeft + (currentPositionX - diffX)) + 'px'
        }
        if (dragValidation.allowY) {
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
    dragValidation = checkAllowDrag(el)
  },

  unbind() {
    console.log('unbind')
  }
}
