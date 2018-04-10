<template lang="jade">
  .tagDeletePopover
    .bg(@click="destroy")
    modal.modalContainer
      .content
        | 我们将删除此标签并将其从您所有的 Keep 记事中移除。您的记事不会被删除。
      .actionWraper
        span.cancel(@click="destroy") 取消
        span.delete(@click="deleteTag") 删除
</template>
<script>
import Modal from '@/components/common/modal'

export default {
  name: 'tagDeletePopover',
  components: {
    Modal,
  },
  data() {
    return {
      index: -1,
    }
  },
  methods: {
    deleteTag() {
      this.parent.confirmDeleteTag(this.index).then(() => {
        // console.log('delete over, start destroy')
        this.destroy()
      })
    },
    destroy() {
      this.$destroy()
      this.$el.parentNode.removeChild(this.$el)
    }
  }
}
</script>
<style lang="less" scoped>
@import (reference) '../../style/headerVars';
.tagDeletePopover {
  & > .bg {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(10,10,10,0.6);
    opacity: .75!important;
    z-index: 5002;
  }
  & > .modalContainer {
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate3d(-50%, -50%, 0);
    padding: 20px 30px;
    width: 430px;
    font-size: 1em;
    max-width: 90vw;
    box-shadow: 0 3px 5px rgba(0,0,0,0.5);
    // z-index: 5003;

    & > .content {
      font-size: 1em;
      line-height: 1.5;
      margin-bottom: 10px;
    }
    
    & > .actionWraper {
      .headerLayout(flex-end);
      width: 100%;
      & > * {
        border-radius: 2px;
        padding: 5px 10px;
        font-weight: 500;
        font-size: 1.1em;
        &:hover {
          cursor: pointer;
          background-color: lighten(grey, 40%);
        }
      }
      & > .cancel {
        margin-right: 10px;
      }
      & > .delete {
        color: #4081FE;
      }
    }
  }
}
</style>