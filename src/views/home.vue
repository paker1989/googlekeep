<template lang="jade">
  .home.container-fluid
    header-container
</template>
<script>
import HeaderContainer from '@/components/header/headerContainer'

export default {
  name: 'home',
  data() {
    return {

    }
  },
  components: {
    HeaderContainer,
  }
}
</script>
<style lang="less" scoped>
  .home {
    padding:0;
  }
</style>


