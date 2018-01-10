<template lang="jade">
  .noteEdition(@focus.capture="editMode=true", :style="bgColor")
    note-title(v-show="editMode", :editMode="editMode")
    note-content                  
    note-toolbar(v-show="editMode")
</template>
<script>
import { createNamespacedHelpers } from 'vuex'
import NoteContent from './noteContentEditable'
import NoteTitle from './noteTitleEditable'
import NoteToolbar from './noteToolbar'

const { mapGetters } = createNamespacedHelpers('userStore')

export default {
  name: 'noteEdition',
  data() {
    return {
      editMode: false,
    }
  },
  methods: {
    stopEditing() {
      this.editMode = false
    },
  },
  components: {
    NoteToolbar, NoteContent, NoteTitle
  },
  computed: {
    ...mapGetters([
      'getUserBgColor'
    ]),
    bgColor() {
      return this.getUserBgColor('abc')
    },
  }
}
</script>
<style lang="less" scoped>
@import (reference) '../../style/contentVars';

.noteEdition {
  position: relative;
  margin: 32px auto 16px auto; 
  background: white;
  box-shadow: 0 3px 5px rgba(0,0,0,0.20);

  @media only screen and (max-width : 600px) {
    width: 93vw;
  }
  @media only screen and (min-width : 600px) {
    width: 600px;
  }
  & >* {
    .basicLayout;
  }
}
</style>


