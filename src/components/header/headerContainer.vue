<template lang="jade">
  .headerContainer
    header-bar
    side-bar.md-sbar(ref="mdSideBar", :class="{ hiddenSideBar: hideSideBar }")
    .sm-sbarWraper(@click="toggleSideBar", :class="{ hiddenSideBar: hideSideBar }")
      side-bar.sm-sbar(ref="smSideBar", :class="{ hiddenSideBar: hideSideBar }")  
</template>
<script>
import { createNamespacedHelpers } from 'vuex'
import Types from '../../store/mutationType'
import HeaderBar from './headerBar'
import SideBar from './sideBar'

const { mapGetters, mapMutations } = createNamespacedHelpers('userStore')

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
  },
  methods: {
    ...mapMutations({
      toggleSideBarStatus: Types.TOGGLE_SIDE_BAR
    }),
    toggleSideBar(event) {
      if (event.target.contains(document.querySelector('.sm-sbarWraper'))) {
        this.toggleSideBarStatus({
          userId: 'abc',
          sideBarStatus: !this.getUserProp('abc', 'sideBarStatus')
        })
      }
    }
  },
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
    width: @sidebar-md-width;
    &.hiddenSideBar {
      transform: translateX(-@sidebar-md-width);
    }
    @media only screen and (min-width : 960px) {
      display: block;
    }
  } // end .md-screen

  & .sm-sbar {
    .sm-bar-basis();
    background-color: whitesmoke;
    z-index: 999;
    width: @sidebar-sm-width;
    &.hiddenSideBar {
      transform: translateX(-@sidebar-sm-width);
    }
    @media only screen and (max-width : 960px) {
      display: flex;
    }
  }

  & .sm-sbarWraper {
    .sm-bar-basis();
    width: 100vw;
    z-index: 998;
    background: transparent;
    &.hiddenSideBar {
      transform: translateX(-100vw);
    }
    @media only screen and (max-width : 960px) {
      display: flex;
    }
  }
}

.sm-bar-basis {
  display: none;
  position: absolute;
  height: 100vh;
  top:0;
}
</style>


