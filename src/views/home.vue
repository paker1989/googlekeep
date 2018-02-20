<template lang="jade">
  .home.container-fluid
    header-container(v-on:toggleSideBar="setContentLayout")
    note-container(:class="{ isAside: displaySideBar }")
    .editAdminContainer(v-if="displayNoteToEdit")
       note-edition(:note="noteToEdit")
    .editAdminContainer(v-if="displayTagAdmin")
      tag-admin
    .bgWraper(v-if="displayBackground", @click.stop="terminateEvent")
    image-presenter(v-if="photoToPresent", :imageEntity="photoToPresent")
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import HeaderContainer from '@/components/header/headerContainer'
import NoteContainer from '@/components/content/content'
import NoteEdition from '@/components/content/noteEdition'
import ImagePresenter from '@/components/content/imagePresenter'
import TagAdmin from '@/components/common/tagAdmin'
import Types from '../store/mutationType'

export default {
  name: 'home',
  methods: {
    setContentLayout(isDisplaySideBar) {
      this.displaySideBar = isDisplaySideBar
    },
    terminateEvent() {
      this.terminateCurrentEvent()
    },
    ...mapMutations('noteStore', {
      terminateCurrentEvent: Types.TERMINATE_TARGET_EVENT
    })
  },
  components: {
    HeaderContainer, NoteContainer, NoteEdition, ImagePresenter, TagAdmin
  },
  computed: {
    ...mapGetters('userStore', [
      'getUserProp',
    ]),
    ...mapGetters('noteStore', [
      'getNoteConfigProp',
    ]),
    ...mapGetters([
      'getGlobalProps'
    ]),
    noteToEdit() {
      // return this.getNoteConfigProp(Types.EDIT_NOTE)
      return this.getGlobalProps(Types.EDIT_NOTE)
    },
    displayNoteToEdit() {
      // return this.getNoteConfigProp(Types.EDIT_NOTE) != null
      return this.getGlobalProps(Types.EDIT_NOTE) != null
    },
    displayBackground() {
      // return this.getNoteConfigProp('currentEvent') != null
      return this.getGlobalProps('currentEvent') != null
    },
    displaySideBar() {
      return !this.getUserProp('abc', 'sideBarStatus')
    },
    photoToPresent() {
      return this.getNoteConfigProp(Types.PRESENT_PHOTO)
    }
  },
}
</script>
<style lang="less" scoped>
@import '../style/headerVars';

.home {
  padding:0;
  position: relative;
  & .isAside {
    @media only screen and (min-width : 960px) {
      margin-left: @sidebar-md-width;
      width: calc(~'100vw - @{sidebar-md-width}');
    }
  }

  & .bgWraper {
    position: fixed;
    z-index: 4000;
    opacity: .75;
    background-color: #e5e5e5;
    transition: opacity .218s ease-in;
    top:0;
    left:0;
    bottom: 0;
    right: 0;
  }

  & .editAdminContainer {
    z-index: 4001;
    position: fixed;
    top: 10vh;
    left: 50%;
    transform: translateX(-50%);
  } 
}
</style>


