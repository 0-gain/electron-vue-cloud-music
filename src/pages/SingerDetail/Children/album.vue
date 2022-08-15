<template>
  <UserItem :itemData="currentAlbumDetail" :subCount="subCount" ref="wrapper">
    <template>
      <el-tabs value="first" @tab-click="handleClick">
        <!-- 歌曲列表 -->
        <el-tab-pane label="歌曲列表" name="first">
          <div class="album-wrapper">
            <listTable
              :officialListDetailItem="albumSongs"
              :isShowCover="false"
              :isShowCheckAll="false"
            />
          </div>
        </el-tab-pane>
        <!-- 评论 -->
        <el-tab-pane :label="`评论(${commentCount})`" name="second">
          <Comment
            type="3"
            @changeScrollTop="changeScrollTop"
            v-if="isShowComment"
          />
        </el-tab-pane>
        <!-- 专辑详情 -->
        <el-tab-pane label="专辑详情" name="third">
          <Description v-if="currentAlbumDetail.description" title="专辑介绍" :des="currentAlbumDetail.description"/>
        </el-tab-pane>
      </el-tabs>
    </template>
  </UserItem>
</template>

<script>
import listTable from "@/components/list-table";
import UserItem from "@/components/UserItem";
import Comment from "@/components/Comment";
import Description from '@/components/Description'

export default {
  name: "album",
  data() {
    return {
      currentAlbumDetail: {},
      // 收藏的数量
      subCount: 0,
      // 专辑歌曲
      albumSongs: {},
      // 评论的数量
      commentCount: 0,
      // 是否显示comment组件
      isShowComment: false,
    };
  },

  mounted() {
    this.getAlbumDetail(this.$route.query.id);
    this.getAlbum_Dynamic(this.$route.query.id);
  },
  methods: {
    // 获取专辑详情
    async getAlbumDetail(id) {
      const result = await this.$API.singer.reqAlbumDetail(id);
      if (result.code === 200) {
        this.currentAlbumDetail = result.album;
        let songs = result.songs;
        this.albumSongs = { songs };
      }
    },

    // 获取专辑收藏数等等
    async getAlbum_Dynamic(id) {
      const result = await this.$API.singer.reqAlbum_Dynamic(id);
      if (result.code === 200) {
        this.subCount = result.subCount;
        this.commentCount = result.commentCount;
      }
    },

    // tab切换
    handleClick(tab) {
      if (tab.name === "second") {
        this.isShowComment = true;
      } else if(tab.name === 'third') {
        this.isShowDescription = true
      }
    },

    // 自定义事件滚动到顶部
    changeScrollTop(scroll) {
      // 实现滚动到顶部
      this.$refs.wrapper.$el.scrollTo({ top: 400, behavior: "smooth" });
    },
  },
  components: {
    UserItem,
    listTable,
    Comment,
    Description,
  },
};
</script>

<style>
.album-wrapper {
  height: calc(100vh - 130px);
  overflow-y: scroll;
  width: 100%;
}
</style>
