<template lang="jade">
  modal.tagModifier
    .tagHeader 为记事添加标签
    .tagSearchContainer
      input(type="text", placeholder="输入标签名称", v-model="typingText")
      span.glyphicon.glyphicon-search
    ul.tagFilterListContainer
      li(v-for="(item, index) in demoTags", :key="index")
        span.checkIcon(:class="{checked : item.isChecked }")
        {{ item.value }}
    .newTagContainer(v-show="true")
      span.glyphicon.glyphicon-plus
      span 创建 "{{typingText}}"
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import Modal from './modal'

export default {
  name: 'tagModifier',
  props: {
    existingTags: {
      type: Array,
      default() { return [] }
    }
  },
  data() {
    return {
      tags: [],
      typingText: ''
    }
  },
  created() {
    const cachedTags = this.getNoteConfigProp('cachedTags')
    if (cachedTags && cachedTags.isRefreshed) {
      this.tags.push(...cachedTags.tags)
    } else {
      this.getTags().then((res) => {
        if (res.err) {
          console.log(res.err)
        } else {
          this.tags.push(...res.tags)
        }
      })
    }
  },
  components: {
    Modal,
  },
  computed: {
    ...mapGetters('noteStore', [
      'getNoteConfigProp'
    ])
  },
  methods: {
    ...mapActions('noteStore', [
      'getTags'
    ])
  }
}
</script>
<style lang="less" scoped>
@import (reference) '../../style/headerVars';
@import (reference) '../../style/common';

.tagModifier {
  width: @tagModifier-width;
  text-align: left;
  padding: .6em 0 0 0;
  & > *:not(:last-child) {
    margin-bottom: .5em; 
    padding: 0 1em;
  }
  & > .tagHeader {
    font-size: 1.1em;
  } // end tagHeader

  & > .tagSearchContainer {
    position: relative;
    width: 100%;
    .headerLayout(space-around);
    & > input[type="text"] {
      flex-grow: 1;
      outline: none;
      border: none;
      &::placeholder {
        letter-spacing: 1px;
      }
    }
    & > .glyphicon-search {
      color: lighten(black, 70%);
      font-size: .8em;
    }
  } // end tagSearchContainer

  .tagFilterListContainer {
    list-style-type: none;
    max-height: @taglist-maxHeight;
    overflow-y: auto;
    margin-top: 1em;
    cursor: pointer;
    & > li {
      .headerLayout(flex-start, row, nowrap, flex-start);
      &:not(:last-child) {
        padding-bottom: 1em;
      }
      &:hover {
        background: #eee;
      }
      & > .checkIcon {
        width: 1.3em;
        height: 1.3em;
        flex-shrink: 0;
        margin-right: .5em;
        background-image: url('../../assets/check.svg');
        background-position: center;
        background-repeat: no-repeat;  
        &.checked {
          background-image: url('../../assets/checked.svg');
        }
      }
    }
  } // end tagFilterListContainer

  & > .newTagContainer {
    .headerLayout(flex-start, row, nowrap, flex-start);
    border-top: 1px solid #eee;
    padding: 1em;
    cursor: pointer;
    &:hover {
      background: #eee;
    }
    & > .glyphicon-plus {
      margin-right: .5em;
      color: lighten(black, 50%);
    }
  }
}
</style>