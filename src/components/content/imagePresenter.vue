<template lang="jade">
  .imagePresenter
    .headerContainer
      .backContainer
        .backWraper
          span.glyphicon.glyphicon-arrow-left
        span.glyphicon.glyphicon-picture.red
        span 照片记事
    .imageContainer
      img.initImagLayout(:src="currentImage")
    .zoomWraper
      .iconContainer
        span.glyphicon.glyphicon-minus
      .iconContainer
        span.glyphicon.glyphicon-zoom-out
      .iconContainer
        span.glyphicon.glyphicon-plus
    .toggleActionWraper(v-show="isLeftRemaining")
      .arrow.arrow-left
      span.glyphicon.glyphicon-chevron-left.chevron-left
    .toggleActionWraper(v-show="isRightRemaining")
      .arrow.arrow-right
      span.glyphicon.glyphicon-chevron-right.chevron-right
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  name: 'imagePresenter',
  props: {
    imageEntity: {
      type: Object,
    }
  },
  data() {
    return {
      currentIndex: this.imageEntity.imageIndex,
      currentZoomer: 1, // 当前放大比例
      maxZoomRatio: 1, // 最多放大比例
    }
  },
  mounted() {
    this.resetZoomer()
  },
  computed: {
    imageRange() {
      return this.getNoteConfigProp('zoomRange')
    },
    currentImage() {
      return this.imageEntity.images[this.currentIndex].url
    },
    isLeftRemaining() {
      return this.currentIndex > 0
    },
    isRightRemaining() {
      return this.currentIndex < this.imageEntity.images.length - 1
    },
    isZoomLess() {
      return this.currentZoomer > 1
    },
    isZoomMore() {
      return this.maxZoomRatio > this.currentZoomer
    },
    ...mapGetters('noteStore', [
      'getNoteConfigProp',
    ]),
  },
  methods: {
    resetZoomer() {
      const actualWidth = document.querySelector('.initImagLayout').width
      const natureWidth = this.imageEntity.images[this.currentIndex].naturalWidth
      this.currentZoomer = 1
      this.maxZoomRatio = Number(natureWidth / actualWidth).toFixed(1)
      console.log(this.maxZoomRatio)
    },
  },
  watch: {
    currentIndex() {
      this.resetZoomer()
    }
  }
}
</script>
<style lang="less" scoped>
@import (reference) '../../style/headerVars';
@headHeight: 50px;
@bottom: 12px;
@zoomHeight: 40px;
// @zoomMargin: 40px;

.imagePresenter {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.8);
  z-index:4002;
  & > .imageContainer {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    & .initImagLayout {
      max-width: 60vw;
      max-height: calc(100vh ~"-" @headHeight ~"-" @bottom ~"-" @zoomHeight);
      z-index: 4003;
    }
  } // end .imageContainer
  & > .headerContainer {
   .headerLayout(space-between);
   position: absolute;
   top: 0;
   width: 100%;
   height: @headHeight;
   padding: 5px 1em;
   color: white;
   font-weight:100;
   font-size: 1.2em;
   & .backContainer {
     height: 100%;
     & > * {
       margin-right: .75em;
       line-height: 40px;
     }
     & .backWraper {
       display: inline-block;
       height: 100%;
       cursor: pointer;
       padding: 0 .75em;
       border-radius: 2px;
       &:hover {
         background: lighten(black, 30%);
       }
     }
     & .red {
       color: darken(rgb(255, 138, 128), 10%);
     }
   }
  } // end headerContainer
  & .toggleActionWraper {
    & > * {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);  
      z-index:1000;    
    }
    & .glyphicon {
      color: white;
    }
    & .arrow {
      border-radius: 50%;
      width: 3em;
      height: 3em;
      background: black;
      z-index: 999;
      transition: all .25s ease;
      &:hover {
        cursor: pointer;
        background: #4285f4;
      }
    } // end .arrow
    & .arrow-right {
      right: 1em;
    }
    & .arrow-left {
      left: 1em;
    }
    & .chevron-right {
      right: 2em;
    }
    & .chevron-left {
      left: 2em;
    }
  } // end toggleActionWraper
  & > .zoomWraper {
    position: absolute;
    bottom: @bottom;
    height: @zoomHeight;
    left: 50%;
    transform: translateX(-50%);
    background: black;
    border-radius: 3px;
    // margin-top: @zoomMargin;
    .headerLayout(space-around);
    & > .iconContainer {
      font-weight: 100;
      font-size: 1.2em;
      padding: 10px 15px;
      // color: white;
      transition: background .25s ease;
      &:hover{
        cursor: pointer;
        color: white;
        background: lighten(black, 30%);
      }
    }
  } // end .zoomWraper
}
</style>

<!--
img.initImagLayout(src="https://keep.google.com/u/1/media/v2/1bSS2CJRCSuWj2ojEwg3rmWSfY_WuWEu8B6BTDGiZ2E8cQNyjI89BV7tDtc_IeA/1DuCVKuXM0EC7sX7d8YxSztD91fCRskRpxoUTMeFkNu41RrdwFTbnO4NmmQYGqw?
accept=image/gif,image/jpeg,image/jpg,image/png,image/webp,audio/aac&sz=587")
-->