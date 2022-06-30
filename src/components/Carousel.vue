<template>
  <div class="slider-wrapper">
    <el-carousel :interval="4000" type="card" height="200px">
      <el-carousel-item
        v-for="(item, index) in banners"
        :key="index"
        :style="{
          background: 'url(' + item.imageUrl + ') no-repeat center top',
          'background-size': '100% 100%',
        }"
      >
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
  name: "Carousel",
  data() {
    return {
      banners:[]
    }
  },
  mounted() {
    this.getBanners()
  },
  methods:{
    async getBanners(){
      const result = await this.$API.recommend.reqBanners()
      this.banners = result.banners
    }
  }
};
</script>

<style lang="less" scope>
.slider-wrapper {
  overflow: hidden;
  width: 100%;
  height: 100%;
  .el-carousel {
    .el-carousel__item {
      width: 50%;
      height: 100%;
      border-radius: 10px;
      h3 {
        width: 100%;
        height: 100%;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
}

.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}

/* .el-carousel__item:nth-child(2n) {
  background-color: #f0f2f5;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
} */
</style>
