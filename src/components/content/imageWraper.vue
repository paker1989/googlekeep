<template lang="jade">
  .imageWraper
    .imageContainer(v-for="image in attachedImages", :style= "{ width: image.width}")
      img(:src="image.url")
</template>
<script>
export default {
  name: 'imageWraper',
  props: ['images'],
  data() {
    return {
      attachedImages: []
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
  height: 100px;
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


