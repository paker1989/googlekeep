<template lang="jade">
  .headerBar
    .leftComponent
      .glyphiconWraper
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
  position: fixed;
  top:0;
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
    & .glyphiconWraper {
      position: relative;
      border-radius: 50%;
      width: @bar-height - @padding-vert*2;
      height: @bar-height - @padding-vert*2;
      &> .glyphicon {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        cursor: pointer;
      }
      &:hover {
        background: darken(@bg-color, 3%);
      }
    } // end .glyphiconWraper
    & .logo {
      font-size: @logo-fsize;
      & strong {
        margin-right:5px;
      }
      @media only screen and (max-width : 960px) {
        display: none;
      }
    } // end .logo
    & .searchWraper {
      height: @bar-height - @padding-vert*2;
      flex-grow: 1;
      flex-shrink: 1; // never minimize
      flex-basis: @search-flex-basis; // equals to min width
    } // end .searchWraper
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


