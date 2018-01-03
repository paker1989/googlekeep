<template lang="jade">
  .headerBar
    .leftComponent
      span.glyphicon.glyphicon-list
      .logo
        strong Google
        | keep
    .rightComponent

</template>
<script>
export default {
  name: 'headerBar',
  data() {
    return {

    }
  },
}
</script>
<style lang="less" scoped>
@import (reference) '../style/headerVars';
.headerBar {
  .headerLayout;
  background-color: @bg-color;
  width: 100%;
  min-height: @min-height;
  padding: 8px 20px;

  & .leftComponent {
    .headerLayout(space-around);
    & > * {
      margin-right: 20px;
    }
    & .logo {
      font-size: 22px;
      & strong {
        margin-right:5px;
      }
    }
  }//end .leftComponent

}//end .headerBar

.headerLayout(@justifyContent: space-between) {
  position: relative;
  display: flex;
  flex-wrap: nowrap;
  justify-content: @justifyContent;
  align-items: center;
}
</style>


