// test
import Vue from 'vue'
/* eslint-disable */
const Test = Vue.extend({
    template: '<p>{{text}} is {{name}}</p>',
    data: function () {
      return {
        text: 'test',
        name: null
      }
    }
  })
  
export default {
  install: Vue => {
    Vue.directive('custTest', {
        bind: (el, binding) => {
          const test = new Test({
          el: document.createElement('span'),
          data: {
              name: 'xubin'
          }
          })
          // test.$mount()
          el.appendChild(test.$el)
       } 
      })
  }
}