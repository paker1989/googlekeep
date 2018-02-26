<template lang="jade">
  modal.tagAdmin
    .titleWraper
      span 修改标签
    .actionContainer
      span.iconBefore(:class="{ editing: isAddingTag }", @click="toggleCreateTag")
      input(type="text", placeholder="创建新标签",
            v-model="typingText",
            v-focus="isAddingTag",
            @focus="isAddingTag=true",
            @keyup.enter="createTag")
      span.iconAfter(v-show="isAddingTag", @click.stop="createTag")
    ul.listContainer
      li(v-for="(tag, index) in tags", :key="index")
        span.iconBefore(:class="{ editing: tag.editing }")
        input(type="text", :value="tag.name", v-focus="tag.editing", @focus="finalizeEdition(index, true)")
        span.iconAfter(:class="{ editing: tag.editing }", @click="finalizeEdition(index, !tag.editing)")      
    footer
      span(@click="terminateEvent") 完成
</template>
<script>
import { mapMutations, mapGetters, mapActions } from 'vuex'
import Modal from './modal'
import Types from '../../store/mutationType'

export default {
  name: 'tagAdmin',
  components: {
    Modal,
  },
  data() {
    return {
      isAddingTag: false,
      tags: [],
      typingText: '',
    }
  },
  created() {
    this.fetchTags()
  },
  beforeDestroy() {
    this.finalizeDestroy({ eventRelatedProp: null })
  },
  directives: {
    focus(el, binding) {
      if (binding.value) {
        el.focus()
      } else {
        el.blur()
      }
    }
  },
  computed: {
    ...mapGetters('userStore', [
      'getUserProp'
    ])
  },
  methods: {
    finalizeEdition(selectedIndex, val) {
      this.tags.forEach((tag, index) => {
        tag.editing = index === selectedIndex ?
          val : false
      })
    },
    fetchTags() {
      const cachedTags = this.getUserProp('abc', 'cachedTags')
      this.tags = []
      this.tags.push(...cachedTags.tags)
      this.tags.forEach((tag) => {
        this.$set(tag, 'editing', false)
      })
    },
    toggleCreateTag() {
      if (this.isAddingTag) {
        this.typingText = ''
        this.isAddingTag = false // 取消
      } else {
        this.isAddingTag = true
      }
    },
    createTag() {
      const findTag = this.tags.find(tag =>
        tag.name.toLowerCase() === this.typingText.trim().toLowerCase()
      )
      if (findTag) return
      this.addTag({ userId: 'abc', tag: this.typingText.trim() })
      .then((res) => {
        this.$set(res.tag, 'editing', false)
        this.tags.unshift(res.tag)
        this.typingText = ''
      },
      (err) => {
        console.log(err)
      })
    },
    ...mapMutations({
      finalizeDestroy: Types.FINALIZE_TARGET_EVENT,
      terminateEvent: Types.TERMINATE_TARGET_EVENT,
    }),
    ...mapActions('userStore', [
      'addTag'
    ])
  },
  watch: {
    isAddingTag(val) {
      if (val) {
        this.tags.forEach((tag) => {
          tag.editing = false
        })
      }
    }
  }
}
</script>
<style lang="less" scoped>
 @import (reference) '../../style/headerVars';
 @padding-edition: 20px;
 @margin-edition: 15px;

.tagAdmin {
  position: relative;
  width: 300px;
  padding: 15px 0;
  .headerLayout(center,column,nowrap);

  & > * {
    width: 100%;
  }
  & > .titleWraper {
    text-align: left;
    font-size: 18px;
    font-weight: 500;
    padding: 0 15px;
  }
  & > .actionContainer {
   padding: 10px @padding-edition;
   .headerLayout();

   & > .iconBefore {
     background-image: url('../../assets/delete.svg');
     .iconStyle();
     &:not(.editing) {
       background-image: url('../../assets/add.svg');
     }
   }    
   & > input[type="text"] {
     flex-grow: 1;
     outline: none;
     border: none;
     margin: 0 @margin-edition;
     font-size: 15px;
     padding-bottom: 1px;
     &::placeholder {
      letter-spacing: 1px;
      font-weight: 400;
     }
     &:focus {
       border-bottom: 1px solid lightgrey;
     }
   }
   & > .iconAfter {
     .iconStyle();
     background-image: url('../../assets/globalSelect.svg');
   }
  }// end actionContainer

  & .listContainer {
    list-style-type: none;
    padding-left: 0;
    text-align: left;
    max-height: 300px;
    overflow-y: auto;
    & > li {
      padding: 1em @padding-edition;
      .headerLayout();
      & > input[type="text"] {
        outline: none;
        border: none;
        flex-grow: 1;
        font-size: 15px;
        font-weight: 500;
        margin: 0 @margin-edition;
        &:focus {
          border-bottom: 1px solid lightgray;
        }
      }
      & > .iconBefore {
        .iconStyle();
        background-image: url('../../assets/trash.svg');
        &:not(.editing) {
          background-image: url('../../assets/tag.svg');
        }
      }
      & > .iconAfter {
        .iconStyle();
        background-image: url('../../assets/globalSelect.svg');
        &:not(.editing) {
          background-image: url('../../assets/edit.svg');
        }
      }
    }
  } // end listContainer
  & > footer {
    border-top: 1px solid lightgrey;
    & > span {
      float: right;
      margin: 1em 1em 0 0;
      font-size: 15px;
      font-weight: 500;
      cursor: pointer;
    }
  }
}

.iconStyle {
  height: 24px;
  width: 24px;
  color: grey;
  flex-shrink: 0;
  background-position: center;
  background-repeat: no-repeat;
  opacity: .54; 
  transition: all .25s ease;
  &:hover {
   cursor: pointer;
   opacity: .74;
  }
}
</style>