
  /* eslint import/prefer-default-export: off */

function stopProp(event) {
  event.stopPropagation()
}

function execBindingEvent(vnode, binding) {
  return vnode.context[binding.expression]
}

export const custBlur = {
  bind(el, binding, vnode) {
    el.addEventListener('click', stopProp)
    if (binding.arg) {
      document.querySelector(`.${binding.arg}`).addEventListener(
        'click', execBindingEvent(vnode, binding))
    } else {
      document.addEventListener('click', execBindingEvent(vnode, binding))
    }
  },

  unbind(el, binding, vnode) {
    el.removeEventListener('click', stopProp)
    if (binding.arg) {
      document.querySelector(`.${binding.arg}`).removeEventListener(
        'click', execBindingEvent(vnode, binding))
    } else {
      document.removeEventListener('click', execBindingEvent(vnode, binding))
    }
  },
}

// export const cancelGlobalSelect = {
//   bind(el, binding, vnode) {
//     el.addEventListener('click', stopProp)
//     document.addEventListener('click', execBindingEvent(vnode, binding))
//   }
// }
