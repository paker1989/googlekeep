<template lang="jade">
  .searchInput
    span.glyphicon.glyphicon-search
    input(type="text", placeholder="搜索")
    span.glyphicon.glyphicon-remove
</template>
<script>
export default {
  name: 'searchInput',
  data() {
    return {

    }
  },
}
</script>
<style lang="less" scoped>
@import '../../style/headerVars';
.searchInput{
  position: relative;
  &> .glyphicon-search {
    .icon-layout;
  }
  &> .glyphicon-remove {
    .icon-layout(right);
    font-weight: 100;
  }
  &> input[type="text"] {
    box-sizing: border-box;
    height:  @bar-height - @padding-vert*2;
    width: 100%;
    padding:11px @search-padding-hor;
    outline: none;
    border-radius: 4px;
    border:none;
    background: darken(@bg-color, 1%);
    font-size: @search-fontSize;

    &:focus {
      background: white;
    }
  } // end input
}

.icon-layout(@direction: left) {
  position: absolute;
  top:50%;
  transform: translateY(-50%);
  @{direction}: (@search-padding-hor - @search-fontSize)/2;
  font-size: @search-fontSize; 
  color: darken(@bg-color, 10%);
}
</style>


