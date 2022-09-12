<template>
  <div>
    <div class="item" v-for="(a, index) in albumData" :key="index" @click="goRoute(a)">
      <div class="cover">
        <img
          v-lazy="a.img1v1Url || a.blurPicUrl || a.coverImgUrl || a.picUrl || a.avatarUrl" 
          alt=""
          :key="index"
        />
      </div>
      <span class="name">
        {{ a.name || a.nickname }}
        <span class="alia" v-if="a.alia">({{ a.alia[0] }})</span>

        <span v-show="a.gender == 1">
          <i class="el-icon-male"></i>
        </span>
        <span v-show="a.gender == 0">
          <i class="el-icon-female"></i>
        </span>

      </span>
      <span class="signature" v-if="a.signature">
        {{a.signature}}
      </span>
      <span class="trackCount" v-if="a.trackCount"> {{ a.trackCount }}首 </span>
      <span class="artistName" v-if="a.artist">
        {{ a.artist.name }}
        <span class="alia" v-if="a.artist">({{ a.artist.alias[0] }})</span>
      </span>
      <span class="artistName" v-if="a.creator">
        by {{ a.creator.nickname }}
      </span>

      <span class="playCount" v-if="a.playCount">
        <i class="iconfont icon-bofang"></i>
        {{ a.playCount | numberFormat }}
      </span>

      <span class="dj" v-if="a.dj">
        by {{a.dj.nickname}}
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "AlbumItem",
  props: {
    albumData: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  methods: {
    goRoute(a){
      console.log(a)
      this.$emit('changeRoute',a)
    }
  },
};
</script>

<style lang="less" scoped>
.item {
  margin-top: 5px;
  box-sizing: border-box;
  font-size: 14px;
  line-height: 80px;
  margin-left: -30px;
  padding-left: 30px;
  width: calc(100% + 60px);
  &:hover {
    background-color: @bg-deep-color-hover;
    cursor: pointer;
  }
  .cover {
    display: inline-block;
    vertical-align: middle;
    width: 60px;
    height: 60px;
    border-radius: 5px;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .name {
    display: inline-block;
    vertical-align: middle;
    margin-left: 10px;
    font-size: 14px;
    color: @artist-color;
    width: 40%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .alia {
    color: @minor-color;
  }
  .playCount{
    font-size: 12px;
    color: @minor-color;
    i{
        font-size: 12px;
    }
  }
}
</style>
