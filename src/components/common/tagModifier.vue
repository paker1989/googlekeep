<template lang="jade">
  modal.tagModifier
    .tagHeader 为记事添加标签
    .tagSearchContainer
      input(type="text", placeholder="输入标签名称", v-model="typingText",
            @keyup.enter="enterTypingText")
      span.glyphicon.glyphicon-search
    ul.tagFilterListContainer
      li(v-for="(item, index) in matchedTags", :key="index", @click="toggleTag(index)")
        span.checkIcon(:class="{checked : item.checked }")
        {{ item.name }}
    .newTagContainer(v-show="isShowCreate", @click.stop="createAndAddTag")
      span.glyphicon.glyphicon-plus
      span 创建 "{{typingText}}"
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import Modal from './modal'

export default {
  name: 'tagModifier',
  props: {
    selectedTags: {
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
    this.fetchTags()
  },
  components: {
    Modal,
  },
  computed: {
    matchedTags() {
      return this.tags.filter(tag => tag.name.includes(this.typingText.trim()))
    },
    isShowCreate() {
      return this.matchedTags.length === 0 && this.typingText.trim().length > 0
    },
    ...mapGetters('userStore', [
      'getUserProp'
    ])
  },
  methods: {
    fetchTags() {
      this.tags = []
      const cachedTags = this.getUserProp('abc', 'cachedTags')
      if (cachedTags && cachedTags.isRefreshed) {
        this.tags.push(...cachedTags.tags)
        this.fetchStatus()
      } else {
        this.getTags({ userId: 'abc' }).then((res) => {
          if (res.err) {
            console.log(res.err)
          } else {
            this.tags.push(...res.tags)
            this.fetchStatus()
          }
        })
      }
    },
    fetchStatus() {
      this.tags.forEach((tag) => {
        tag.checked = this.selectedTags.some(selectedTag => selectedTag.name === tag.name)
      })
    },
    createAndAddTag() {
      this.addTag({ tag: this.typingText.trim(), userId: 'abc' })
        .then((res) => {
          this.$emit('toggleTagToNote', { tag: res.tag })
          this.typingText = ''
        }, (err) => {
          console.log(err)
        })
    },
    toggleTag(index) {
      this.$emit('toggleTagToNote', { tag: this.matchedTags[index] })
      this.typingText = ''
    },
    enterTypingText() {
      if (this.typingText.trim().length === 0) return
      if (this.isShowCreate) {
        this.createAndAddTag()
      } else {
        this.toggleTag(0)
      }
    },
    ...mapActions('userStore', [
      'getTags', 'addTag'
    ])
  },
  watch: {
    selectedTags() {
      this.fetchTags()
    }
  }
}
</script>
<style lang="less" scoped>
@import (reference) '../../style/headerVars';
@import (reference) '../../style/common';

.tagModifier {
  position: absolute;
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
      padding-bottom: 1em;
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