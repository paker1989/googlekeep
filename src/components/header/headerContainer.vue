<template lang="jade">
  .headerContainer
    header-bar
    side-bar.md-sbar(ref="mdSideBar", :class="{ hiddenSideBar: hideSideBar }")
    side-bar.sm-sbar(ref="smSideBar", :class="{ hiddenSideBar: hideSideBar }")  
</template>
<script>
import { createNamespacedHelpers } from 'vuex'
import HeaderBar from './headerBar'
import SideBar from './sideBar'

const { mapGetters } = createNamespacedHelpers('userStore')

export default {
  name: 'headerContainer',
  components: {
    HeaderBar, SideBar
  },
  computed: {
    ...mapGetters([
      'getUserProp'
    ]),
    hideSideBar() {
      return this.getUserProp('abc', 'sideBarStatus')
    }
  }
}
</script>
<style lang="less" scoped>
@import '../../style/headerVars';

.headerContainer {
  position: relative;
  width: 100%;
  height: @bar-height;
  .md-sbar {
    display: none;
    position: absolute;
    height: calc(~'100vh - 100%');
    top:100%;
    &.hiddenSideBar {
      transform: translateX(-@sideBar-width);
    }
    @media only screen and (min-width : 960px) {
      display: flex;
    }
  } // end .md-screen
  & .sm-sbar {
    display: none;
    position: absolute;
    height: 100vh;
    top:0;
    background-color: whitesmoke;
    z-index: 999;
    &.hiddenSideBar {
      transform: translateX(-@sideBar-width);
    }
    @media only screen and (max-width : 960px) {
      display: flex;
    }
  }
}
</style>


