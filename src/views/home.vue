<template lang="jade">
  .home.container-fluid
    header-bar
</template>
<script>
import HeaderBar from '@/components/headerBar'

export default {
  name: 'home',
  data() {
    return {

    }
  },
  components: {
    HeaderBar,
  }
}
</script>
<style lang="less" scoped>
  .container-fluid {
    padding:0;
  }
</style>


