<template lang="jade">
  .imagePresenter
    .headerContainer
      .backContainer
        .backWraper(@click="backToEdition")
          span.glyphicon.glyphicon-arrow-left
        span.glyphicon.glyphicon-picture.red
        span 照片记事
    .imageContainer
      //- img.initImagLayout(:src="currentImage")
      img#targetPhoto(:src="currentImage", :class="{initImagLayout: initialLayout}",
        @keyup.enter="test", v-drag-drop="currentZoomer")
    .zoomWraper
      .iconContainer(:class="{activeZoom: isZoomLess}", @click="zoomLess")
        span.glyphicon.glyphicon-minus
      .iconContainer(:class="{activeZoom: isZoomOriginal}", @click="zoomOrigin")
        span.glyphicon.glyphicon-zoom-out
      .iconContainer(:class="{activeZoom: isZoomMore}", @click="zoomMore")
        span.glyphicon.glyphicon-plus
    .toggleActionWraper(v-show="isLeftRemaining", @click="currentIndex--")
      .arrow.arrow-left
      span.glyphicon.glyphicon-chevron-left.chevron-left
    .toggleActionWraper(v-show="isRightRemaining", @click="currentIndex++")
      .arrow.arrow-right
      span.glyphicon.glyphicon-chevron-right.chevron-right
</template>
<script>
import { mapGetters, mapMutations } from 'vuex'
import DragDrop from '../../directives/dragDrop'
import Types from '../../store/mutationType'

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
      initialLayout: true, // 需要监听鼠标事件模拟拖拽效果
      currentZoomer: 1, // 当前放大比例
      maxZoomRatio: 1, // 最多放大比例,
      allowX: false,
      allowY: false,
    }
  },
  created() {
    document.addEventListener('keyup', this.escEventListener)
  },
  mounted() {
    this.resetZoomer()
  },
  directives: {
    DragDrop,
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
    isZoomOriginal() {
      return this.currentZoomer !== 1
    },
    ...mapGetters('noteStore', [
      'getNoteConfigProp',
    ]),
  },
  methods: {
    resetZoomer() {
      this.initialLayout = true
      this.$nextTick(function () {
        const actualWidth = document.querySelector('.initImagLayout').width
        const natureWidth = this.imageEntity.images[this.currentIndex].naturalWidth

        this.currentZoomer = 1
        this.maxZoomRatio = Number(natureWidth / actualWidth).toFixed(1)
      })
    },
    zoomMore() {
      if (this.isZoomMore) {
        if (this.initialLayout) {
          this.initialLayout = false
        }
        const nextZoomer = Math.min(this.currentZoomer * this.imageRange, this.maxZoomRatio)
        document.querySelector('#targetPhoto').width *= nextZoomer / this.currentZoomer
        document.querySelector('#targetPhoto').height *= nextZoomer / this.currentZoomer
        this.currentZoomer = nextZoomer
      }
    },
    zoomLess() {
      if (this.isZoomLess) {
        if (this.initialLayout) {
          this.initialLayout = false
        }
        const nextZoomer = Math.max(this.currentZoomer / this.imageRange, 1)
        document.querySelector('#targetPhoto').width *= nextZoomer / this.currentZoomer
        document.querySelector('#targetPhoto').height *= nextZoomer / this.currentZoomer
        this.currentZoomer = nextZoomer
      }
    },
    zoomOrigin() {
      if (this.isZoomOriginal) {
        this.initialLayout = true
        document.querySelector('#targetPhoto').width *= 1 / this.currentZoomer // resize事件有问题
        document.querySelector('#targetPhoto').height *= 1 / this.currentZoomer
        this.currentZoomer = 1
      }
    },
    backToEdition() {
      document.removeEventListener('keyup', this.escEventListener)
      this.cancelPresentation()
    },
    escEventListener(e) {
      if (e.keyCode === 27) {
        this.backToEdition()
      }
      if (e.keyCode === 37 && this.isLeftRemaining) {
        this.currentIndex -= 1
      }
      if (e.keyCode === 39 && this.isRightRemaining) {
        this.currentIndex += 1
      }
    },
    updateDragValidation() {

    },
    ...mapMutations('noteStore', {
      cancelPresentation: Types.CANCEL_PRESENT_PHOTO
    })
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
    & img {
      transition: all .2s ease;
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
      &.activeZoom:hover{
        cursor: pointer;
        color: white;
        background: lighten(black, 30%);
      }
    }
  } // end .zoomWraper

  .dragging {
    cursor: pointer;
  }
  .move {
    cursor: move;
  }
}
</style>