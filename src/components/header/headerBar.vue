<template lang="jade">
  .headerBar(:class="{ displayBoxShadow: leaveTop }")
    .leftComponent
      .glyphiconWraper
        span.glyphicon.glyphicon-list(@click="toggleSideBar")
      .logoWraper
        strong Google
        | keep
      search-input.searchWraper
    .rightComponent
    // .test(v-custTest)

</template>
<script>
import { createNamespacedHelpers } from 'vuex'
import Types from '../../store/mutationType'
import SearchInput from './searchInput'

const { mapGetters, mapMutations } = createNamespacedHelpers('userStore')

export default {
  name: 'headerBar',
  props: ['hideSideBar'],
  data() {
    return {
      leaveTop: false
    }
  },
  created() {
    window.addEventListener('scroll', _.debounce(() => {
      this.leaveTop = window.scrollY > 0
    }, 100))
  },
  components: {
    SearchInput,
  },
  computed: {
    ...mapGetters([
      'getUserProp'
    ]),
  },
  methods: {
    ...mapMutations({
      toggleSideBarStatus: Types.TOGGLE_SIDE_BAR
    }),
    toggleSideBar() {
      this.toggleSideBarStatus({
        userId: 'abc',
        sideBarStatus: !this.getUserProp('abc', 'sideBarStatus')
      })
    }
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
  z-index: 997;
  transition: all .2s ease;
  &.displayBoxShadow {
    box-shadow: 0 4px 5px 0 rgba(0,0,0,0.14),
                0 1px 10px 0 rgba(0,0,0,0.12), 
                0 2px 4px -1px rgba(0,0,0,0.2);
  }

  & .leftComponent {
    position: relative;
    flex-grow: 1;
    .headerLayout(flex-start);
    & > * {
      margin-right: @lc-mar-right;
      flex: 0 1 auto;
      flex-basis: 0px;
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
    & .logoWraper {
      font-size: @logo-fsize;
      & strong {
        margin-right:5px;
        @media only screen and (max-width : 600px) {
          display: none;
        }
      }

    } // end .logo
    & .searchWraper {
      height: @bar-height - @padding-vert*2;
      flex: 1 1 auto;
      max-width: @search-max-size;
      // flex-basis: @search-flex-basis; // equals to min width
    } // end .searchWraper
  } // end .leftComponent

  & .rightComponent {
    .headerLayout(flex-end);
  } // end .rightComponent

}// end .headerBar
</style>


