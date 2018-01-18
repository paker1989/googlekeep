<template lang="jade">
  .imageWraper
    .imageContainer(v-for="image in attachedImages", 
                    :style= "{ width: image.width}")
      img(:src="image.url", :class="{uploading: image.uploading}")
      .progress(v-if="image.uploading")
        .progress-bar.progress-bar-striped.active(role="progressbar", style="width: 100%")
</template>
<script>
import { createNamespacedHelpers } from 'vuex'
import { arrangeImages } from '../../plugins/utils'

const { mapActions } = createNamespacedHelpers('noteStore')

export default {
  name: 'imageWraper',
  props: ['images'],
  data() {
    return {
      attachedImages: []
    }
  },
  created() {
    this.attachedImages = _.assignIn(this.attachedImages, arrangeImages(this.images))
  },
  methods: {
    uploadNewImage({ newImages }, noteId) {
      const vm = this
      newImages.forEach((newImage) => {
        const fileReader = new FileReader()
        fileReader.onload = (e) => {
          const tmpUrl = e.target.result
          const image = new Image()
          image.src = tmpUrl
          image.onload = () => {
            let tmpImage = {
              url: image.src,
              uploading: true,
              naturalHeight: image.naturalHeight,
              naturalWidth: image.naturalWidth
            }
            vm.attachedImages.push(tmpImage)
            vm.attachedImages = _.assignIn([], arrangeImages(vm.attachedImages))
            // handle image storage
            const formData = new FormData()
            formData.append('newPhoto', newImage)
            formData.append('naturalWidth', tmpImage.naturalWidth)
            formData.append('naturalHeight', tmpImage.naturalHeight)
            if (noteId) {
              formData.append('noteId', noteId)
            }
            vm.savePhoto({ formData }).then(() => {
              tmpImage = _.assign(tmpImage, {
                uploading: false
              })
            }, (err) => {
              console.log(err)
            })
          }
        }
        fileReader.readAsDataURL(newImage)
      })
    },
    reset() {
      this.attachedImages = []
    },
    ...mapActions([
      'savePhoto'
    ])
  }
}
</script>
<style lang="less" scoped>
.imageWraper {
  position: relative;
  width: 100%;
  margin: 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  & .imageContainer {
    position:relative;
    padding: 1px;
    &> img {
      position: relative;
      width: 100%;
      &.uploading {
        opacity: .3;
      }
    }
  }
}
</style>


