<template>
  <div>
    <albumItem :albumData="userprofiles" @changeRoute="changeRoute"/>
  </div>
</template>

<script>
import albumItem from "@/components/albumItem";

export default {
  name: "playlist",
  data() {
    return {
      userprofiles: [],
    };
  },
  props:['offset'],
  mounted() {
    this.getSearchKeywords(this.$route.query.keywords);
  },
  methods: {
    // 关键字搜索
    async getSearchKeywords( keywords,offset,type ) {
      const result = await this.$API.search.reqSearchKeywords(keywords,offset,type);
      if (result.code === 200) {
        this.userprofiles = result.result.userprofiles;
        let str = `找到${result.result.userprofileCount || 0}位用户`;
        this.$emit("handleCount", str);
      }
    },

    // 跳转路由
    changeRoute(data){
      this.$router.push({path:'/person',query:{id:data.userId}})
    }
  },
  components: { albumItem },
};
</script>

<style lang="less" scoped>
/deep/.item {
  .cover {
    border-radius: 50%;
    border: 1px solid @border-color;
  }
  .name {
    color: #333;
    i {
      margin-left: 5px;
    }
    .el-icon-female {
      color: rgb(255, 160, 176);
      font-size: 16px;
      background-color: rgb(248, 228, 231);
      padding: 3px;
      border-radius: 50%;
      margin-left: 10px;
    }
    .el-icon-male {
      color: rgb(91, 187, 209);
      font-size: 16px;
      background-color: rgb(191, 243, 255);
      padding: 3px;
      border-radius: 50%;
      margin-left: 10px;
    }
  }
  .signature{
    float: right;
    font-size: 12px;
    color: @minor-color;
    margin-right: 50px;
  }
}
</style>
