<template lang="jade">
  .home.container-fluid
    header-container(v-on:toggleSideBar="setContentLayout")
    note-container(:class="{ isAside: displaySideBar }")

</template>
<script>
import HeaderContainer from '@/components/header/headerContainer'
import NoteContainer from '@/components/content/content'

export default {
  name: 'home',
  data() {
    return {
      displaySideBar: false
    }
  },
  methods: {
    setContentLayout(isDisplaySideBar) {
      this.displaySideBar = isDisplaySideBar
    }
  },
  components: {
    HeaderContainer, NoteContainer
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
      margin-left: @sideBar-width;
      width: calc(~'100vw - @{sideBar-width}');
    }
  }
}
</style>


