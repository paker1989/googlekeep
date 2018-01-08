<template lang="jade">
  li.sideBarMenuItem
    a(href="#")
      slot(name="itemIcon")
      slot
</template>
<script>
export default {
  name: 'sideBarMenuItem',
}
</script>
<style lang="less" scoped>
@import '../../style/headerVars';

.sideBarMenuItem {
  position: relative;
  width: 100%;
  &:hover {
    background-color: darken(#e8e8e8, 10%);
  }
  &> a {
    display: inline-block;
    width: 100%; 
    padding: 1.5em 2em;
    text-decoration: none;
    color:lighten(black, 10%);
    text-align: left;
    &> * {
      margin-right: 20%;
      font-size: 1.5em;
      vertical-align: text-bottom;
    }
  }
}
</style>

<!--
  &> * {
    margin-right: 20%;
    font-size: 1.5em;
    line-height: 1.5em;
    vertical-align: middle;
  }
-->


