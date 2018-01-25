
  /* eslint import/prefer-default-export: off */

function stopProp(event) {
  event.stopPropagation()
}

function hide(vnode, binding) {
  return vnode.context[binding.expression]
}

export const clickOutside = {
  bind(el, binding, vnode) {
    el.addEventListener('click', stopProp)
    document.addEventListener('click', hide(vnode, binding))
  },

  unbind(el, binding, vnode) {
    el.removeEventListener('click', stopProp)
    document.removeEventListener('click', hide(vnode, binding))
  },
}

