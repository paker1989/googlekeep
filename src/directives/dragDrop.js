import util from '../util'
/* eslint-disable */
let diffX
let diffY
let originMarginLeft = 0
let originMarginTop = 0
let currentPositionX
let currentPositionY
let dragValidation
let rangeValidation
let dragging
let vm
let eventQueue = ['mousedown', 'drag', 'mousemove', 'mouseup']

const dragDropClass = {
  drag: 'dragging',
}

function checkAllowDrag(node)
{
  const clientWidth = document.documentElement.clientWidth || document.body.clientWidth
  const clientHeight = document.documentElement.clientHeight || document.body.clientHeight
  const nodeWidth = Number.parseInt(util.getStyle(node, 'width'))
  const nodeHeight = Number.parseInt(util.getStyle(node, 'height'))

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

  return {
    allowRangeLtR: offsetLeft <= 0,
    allowRangeRtL: offsetRight <= 0,
    allowRangeTtD: offsetTop <= 0,
    allowRangeDtT: offsetBottom <= 0,
  }
}

function handleEvent(event) {
  switch(event.type) {
    case 'mousedown': 
      dragging = vm
      vm.classList.add(dragDropClass.drag)
      diffX = event.clientX
      diffY = event.clientY
      dragValidation = checkAllowDrag(vm)  
      break
    case 'drag':
      event.preventDefault()
      break
    case 'mousemove':
      event.preventDefault()
      if (dragging != null) {
        currentPositionX = event.clientX
        currentPositionY = event.clientY
        rangeValidation = checkDragRange(vm)
    
        const dirConditionHor = (currentPositionX - diffX) > 0 ?
          rangeValidation.allowRangeLtR : rangeValidation.allowRangeRtL
        const dirConditionVer = (currentPositionY - diffY) > 0 ?
          rangeValidation.allowRangeTtD : rangeValidation.allowRangeDtT
    
        if (dragValidation && dragValidation.allowX && dirConditionHor) {
          vm.style.marginLeft = (originMarginLeft + (currentPositionX - diffX)) + 'px'
        }
        if (dragValidation && dragValidation.allowY && dirConditionVer) {
          vm.style.marginTop = (originMarginTop + (currentPositionY - diffY)) + 'px'
        }
      }  
      break
    case 'mouseup':
      vm.classList.remove(dragDropClass.drag)
      dragging = null
      originMarginLeft = Number.parseInt(vm.style.marginLeft.split('px')[0]) || 0
      originMarginTop = Number.parseInt(vm.style.marginTop.split('px')[0]) || 0
      break
  }
}

export default {
  bind(el, binding) {
    vm = el
    eventQueue.forEach(eventType => el.addEventListener(eventType, handleEvent))
  },

  update(el, binding) {
    el.style.marginTop = 0
    el.style.marginLeft = 0
  },

  unbind(el) {
    eventQueue.forEach(eventType => el.removeEventListener(eventType, handleEvent))
  }
}
