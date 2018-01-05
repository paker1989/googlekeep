<template lang="jade">
  .headerContainer
    header-bar
    
</template>
<script>
import HeaderBar from './headerBar'
import SideBar from './sideBar'

export default {
  name: 'headerContainer',
  data() {
    return {

    }
  },
  components: {
    HeaderBar, SideBar
  }
}
</script>
<style lang="less" scoped>
@import '../../style/headerVars';
.headerContainer {
  position: relative;
}
</style>


