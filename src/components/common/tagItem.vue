<template lang="jade">
  .tagItem
    .tagNameWraper
      slot(name="tagName")
    .deleteAction(@click="deleteItem")
</template>
<script>
export default {
  name: 'tagItem',
  methods: {
    deleteItem() {
      this.$emit('deleteTag')
    }
  }
}
</script>
<style lang="less" scoped>
@import (reference) '../../style/headerVars';
.tagItem {
  position: relative;
  font-size: 11px;
  font-weight: 500;
  border-radius: 2px;
  background-color: rgba(0,0,0,0.08);
  padding: 2px 5px;
  max-width: 100%;
  .headerLayout(flex-start);
  & .tagNameWraper {
    max-width: 100%;
    & .tagName {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      flex: 1 1 auto;
      font-size: 1em;
    }
  }
  & .deleteAction {
    position: absolute;
    right: 2px;
    width: 20px;
    height: 1em;
    flex: 0 0 auto;
    background-image: url('../../assets/delete.svg');
    background-position: center;
    background-repeat: no-repeat; 
    opacity: 0;     
  }
  &:hover {
    cursor:pointer; 
    & .tagNameWraper {
      width: calc(~'100% - 20px');
    }
    & .deleteAction {
      opacity: 1;
    }
  }
}
</style>