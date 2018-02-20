<template lang="jade">
  .tagPresenter
     tag-item(v-for="(tag, index) in filteredTags", :key="index",
              @deleteTag="deleteTag(index)")
       .tagName(slot="tagName") {{ tag.name }}
       
</template>
<script>
import TagItem from './tagItem'

export default {
  name: 'tagPresenter',
  props: {
    maxDisplayItems: {
      type: Number,
      default: -1 // meaning no limitation
    },
    selectedTags: {
      type: Array,
      default() { return [] }
    }
  },
  components: {
    TagItem,
  },
  methods: {
    deleteTag(index) {
      this.$emit('deleteTag', index)
    }
  },
  computed: {
    filteredTags() {
      if (this.maxDisplayItems < 0 || this.maxDisplayItems === -1
        || this.maxDisplayItems >= this.selectedTags.length) {
        return this.selectedTags.slice(0)
      }
      const tmpTags = this.selectedTags.slice(0, this.maxDisplayItems)
      tmpTags.push({
        name: `另外${this.selectedTags.length - this.maxDisplayItems}项内容`,
        isExtend: true,
      })
      return tmpTags
    }
  }
}
</script>
<style lang="less" scoped>
@import (reference) '../../style/headerVars';
@import (reference) '../../style/contentVars';

.tagPresenter {
  .headerLayout(flex-start,row,wrap);
  .basicLayout();
  position: relative;
  width: 100%;
  & > * {
    margin: 6px 6px 0 0;
  }
}
</style>