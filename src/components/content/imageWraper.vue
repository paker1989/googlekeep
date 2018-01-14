<template lang="jade">
  .imageWraper
    .imageContainer(v-for="image in attachedImages", :style= "{ width: image.width}")
      img(:src="image.url")
</template>
<script>
import { arrangeImages } from '../../plugins/utils'

export default {
  name: 'imageWraper',
  props: ['images'],
  data() {
    return {
      attachedImages: []
    }
  },
  watch: {
    images(uplodaedImages) {
      const newImage = uplodaedImages[0]
      const image = new Image()
      image.src = newImage.tmpUrl
      image.onload = () => {
        this.attachedImages.push({
          url: image.src,
          naturalHeight: image.naturalHeight,
          naturalWidth: image.naturalWidth
        })
        this.attachedImages = _.assignIn({}, arrangeImages(this.attachedImages))
        console.log(this.attachedImages)
      }
    }
  },
  created() {
    this.attachedImages = _.assignIn(this.attachedImages, this.images)
  }
}
</script>
<style lang="less" scoped>
.imageWraper {
  position: relative;
  width: 100%;
  // height: 100px;
  margin: 0;
  padding: 0;
  & .imageContainer {
    float: left;
    padding: 1px;
    &> img {
      width: 100%;
    }
  }
}
</style>


