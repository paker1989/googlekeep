<template lang="jade">
  .home.container-fluid
    header-container(v-on:toggleSideBar="setContentLayout")
    note-container(:class="{ isAside: displaySideBar }")
</template>
<script>
import { createNamespacedHelpers } from 'vuex'
import HeaderContainer from '@/components/header/headerContainer'
import NoteContainer from '@/components/content/content'

const { mapGetters } = createNamespacedHelpers('userStore')

export default {
  name: 'home',
  methods: {
    setContentLayout(isDisplaySideBar) {
      this.displaySideBar = isDisplaySideBar
    }
  },
  components: {
    HeaderContainer, NoteContainer
  },
  computed: {
    ...mapGetters([
      'getUserProp'
    ]),
    displaySideBar() {
      return !this.getUserProp('abc', 'sideBarStatus')
    }
  }
}
</script>
<style lang="less" scoped>
@import '../style/headerVars';

.home {
  padding:0;
  position: relative;
  & .isAside {
    @media only screen and (min-width : 960px) {
      margin-left: @sidebar-md-width;
      width: calc(~'100vw - @{sidebar-md-width}');
    }
  }
}
</style>


