<template lang="jade">
  .sideBar
    ul.menuContainer
      side-bar-menu-item
        span.glyphicon.glyphicon-edit
        | 记事
      side-bar-menu-item
        span.glyphicon.glyphicon-glass
        | 提醒
</template>
<script>
import SideBarMenuItem from './sideBarMenuItem'

export default {
  name: 'sideBar',
  data() {
    return {

    }
  },
  components: {
    SideBarMenuItem,
  }
}
</script>
<style lang="less" scoped>
@import '../../style/headerVars';

.sideBar {
  width: @sideBar-width;
  overflow-y: auto;
  overflow-x: hidden;
  transform: translateX(0);
  transition: transform .25s ease;
  // border-right: 1px solid lightgrey; // to remove
  .headerLayout(@justifyContent:flex-start, @flex-direction: column);

  & .menuContainer {
    position: relative;
    width: 100%;
    border-bottom: 1px solid lightgray;
    list-style: none;
    padding: 0;
  }
}


</style>


