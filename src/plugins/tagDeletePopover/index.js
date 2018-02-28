import Vue from 'vue'

const TagDeleteConstructor = Vue.extend(require('./tagDeletePopover.vue').default)

const TagDelete = (parent, selectedIndex) => {
  const tagDeleteInstance = new TagDeleteConstructor({
    data: {
      index: selectedIndex,
    }
  })

  tagDeleteInstance.vm = tagDeleteInstance.$mount()
  tagDeleteInstance.dom = tagDeleteInstance.vm.$el
  tagDeleteInstance.vm.parent = parent
  document.body.appendChild(tagDeleteInstance.dom)
  return tagDeleteInstance.vm
}

export default {
  install: (vue) => {
    vue.prototype.$tagDeletePopover = TagDelete
  }
}
