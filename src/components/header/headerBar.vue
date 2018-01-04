<template lang="jade">
  .headerBar
    .leftComponent
      span.glyphicon.glyphicon-list
      .logo
        strong Google
        | keep
      search-input.searchWraper
    .rightComponent
      | to do

</template>
<script>
import SearchInput from './searchInput'

export default {
  name: 'headerBar',
  data() {
    return {

    }
  },
  components: {
    SearchInput,
  }
}
</script>
<style lang="less" scoped>
@import (reference) '../../style/headerVars';
.headerBar {
  .headerLayout; // flex
  background-color: @bg-color;
  width: 100%;
  height: @bar-height;
  padding: @padding-vert @padding-hor;

  & .leftComponent {
    flex-grow: 1;
    .headerLayout(flex-start);
    & > * {
      margin-right: @lc-mar-right;
    }
    & .logo {
      font-size: @logo-fsize;
      & strong {
        margin-right:5px;
      }
      @media only screen and (max-width : 960px) {
        display: none;
      }
    }
    & .searchWraper {
      height: @bar-height - @padding-vert*2;
      flex-grow: 1;
      flex-shrink: 1; // never minimize
      flex-basis: @search-flex-basis; // equals to min width
    }
  } // end .leftComponent

  & .rightComponent {
    flex-grow: 2;
    .headerLayout(flex-end);
  } // end .rightComponent

}// end .headerBar

.headerLayout(@justifyContent: space-between) {
  position: relative;
  display: flex;
  flex-wrap: nowrap;
  justify-content: @justifyContent;
  align-items: center;
}
</style>


