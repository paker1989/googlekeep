<template lang="jade">
  .tagSidebarContainer
    .tagSidebarHeader
      span 标签
      span.modifier(@click="editTagAdmin") 修改
    ul.availableTagWrapeer
      li(v-for="(tag, index) in tags", :key="index")
        span.glyphicon.glyphicon-file
        span {{ tag.name }}
      li
        span.glyphicon.glyphicon-plus
        strong
          span 添加新标签
</template>
<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
import Types from '../../store/mutationType'

export default {
  name: 'tagSideBar',
  data() {
    return {
      tags: []
    }
  },
  created() {
    this.fetchTags()
  },
  computed: {
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
      } else {
        this.getTags({ userId: 'abc' }).then((res) => {
          if (res.err) {
            console.log(res.err)
          } else {
            this.tags.push(...res.tags)
          }
        })
      }
    },
    ...mapMutations({
      editTagAdmin: Types.EDIT_TAG_ADMIN
    }),
    ...mapActions('userStore', [
      'getTags'
    ])
  },
}
</script>
<style lang="less" scoped>
@import (reference) '../../style/headerVars';

.tagSidebarContainer {
  position: relative;
  & .tagSidebarHeader {
    .headerLayout(space-between);
    font-weight: 500;
    padding: 1em 2em;
    & > .modifier {
      padding: .3em 1em;
      &:hover {
        cursor: pointer;
        border-radius: 3px;
        background: rgba(0, 0, 0, 0.08);
      }
    }
  }
  & .availableTagWrapeer {
    list-style-type: none;
    padding-left: 0;
    text-align: left;
    & > li {
      padding: 1em 2em;
      .headerLayout(flex-start,row,nowrap,flex-start);
      & > .glyphicon {
        color: black;
        opacity: .54;
        margin-right: 2em;
      }
      & > :not(.glyphicon) {
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
      }
      &:hover {
        background: rgba(0, 0, 0, 0.08);
        cursor: pointer;
      }
    }
  }
}
</style>


