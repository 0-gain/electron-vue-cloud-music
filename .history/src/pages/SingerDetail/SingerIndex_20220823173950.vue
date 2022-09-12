<template>
  <UserItem :itemData="artistDetail">
    <template>
      <el-tabs value="first" @tab-click="handleClick">
        <!-- 专辑 -->
        <el-tab-pane label="专辑" name="first">
          <div class="album-wrapper" v-if="isShowAlbum">
            <div class="artistTopSong">
              <!-- 热歌前50首 -->
              <listTable
                :officialListDetailItem="artistTopSong"
                :coverImgUrl="topSongLogo"
                @checkTotalSong="toggleRowExpansion"
                :isShowCheckAll="isShowCheckAll"
                showType="singerIndex"
              />
            </div>
            <div
              class="album-content"
              v-infinite-scroll="load"
              :infinite-scroll-disabled="!isMore"
              infinite-scroll-immediate="false"
              infinite-scroll-delay="500"
              infinite-scroll-distance="180"
            >
              <!-- 专辑 -->
              <div
                class="album-item"
                v-for="(item, index) in AlbumDetail"
                :key="index"
              >
                <listTable
                  :officialListDetailItem="item.songsObj"
                  :coverImgUrl="item.album.blurPicUrl"
                  :isShowCheckAll="item.songsObj.songs.length > 10"
                  @checkTotalSong="albumPlaylistDetail"
                  :listId="item.album.id.toString()"
                  showType="singerIndex"
                />
              </div>
            </div>
          </div>
        </el-tab-pane>
        <!-- MV -->
        <el-tab-pane label="MV" name="second">
          <div
            v-infinite-scroll="infiniteMv"
            :infinite-scroll-disabled="!isHasMoreMv"
            infinite-scroll-immediate="false"
            infinite-scroll-delay="500"
            infinite-scroll-distance="50"
            v-if="isShowMv && ArtistMvs.length"
          >
            <ListItem
              class="ArtistMvs"
              :listData="ArtistMvs"
              :isShowIcon="false"
              @changeRoute="changeRoute"
            />
          </div>
          <p v-else>暂无MV</p>
        </el-tab-pane>
        <!-- 歌手详情 -->
        <el-tab-pane label="歌手详情" name="third">
          <div v-if="introduction.length">
            <div v-for="(item, index) in introduction" :key="index">
              <Description :title="item.ti" :des="item.txt" />
            </div>
          </div>

          <p v-else>暂无简介</p>
        </el-tab-pane>
        <!-- 相似歌手 -->
        <el-tab-pane label="相似歌手" name="fourth">
          <ListItem
            class="simiArtist"
            :listData="simiArtist"
            :hiddenIcon="true"
            @changeRoute="goRouteSingerDetail"
          />
        </el-tab-pane>
      </el-tabs>
    </template>
  </UserItem>
</template>

<script>
import UserItem from "@/components/UserItem";
import ListItem from "@/components/list-item";
import listTable from "@/components/list-table";
import Description from "@/components/Description";
export default {
  name: "SingerDetail",
  data() {
    return {
      // 歌手的详情数据
      artistDetail: {},
      // 热门50首歌曲
      artistTopSong: {},
      // 专辑详情
      AlbumDetail: [],
      // 歌手的描述
      introduction: [],
      // 所有mv的数量
      ArtistMvs: [],
      // 当前需要渲染的专辑详情页
      currentAlbumDetail: {},
      // 热门50首封面
      topSongLogo: require("@/assets/images/topSongsLogo.png"),
      // 是否显示查看全部
      isShowCheckAll: true,
      // 是否还有数据可以滚动获取
      isMore: true,
      // 当前的页数
      currentPage: 1,
      // 当前一页显示的专辑数
      limit: 10,
      // 是否显示专辑
      isShowAlbum: true,
      // 是否显示mv
      isShowMv: false,
      // 当前mv的页数
      currentMvPage: 1,
      // 是否mv还有数据可以滚动获取
      isHasMoreMv: true,
      // 相似的歌手
      simiArtist: [],
    };
  },
  mounted() {
    this.InitData();
  },
  inject: ["reload"],
  methods: {
    // 初始化数据
    InitData() {
      this.getArtistDetail(this.$route.query.id);
      this.getArtistAlbum(this.$route.query.id, this.limit);
      this.getArtistTopSong(this.$route.query.id);
      this.getArtistDesc(this.$route.query.id);
      this.getArtistMv(this.$route.query.id);
      this.getSimiArtist(this.$route.query.id);
    },

    // 获取歌手的详情
    async getArtistDetail(id) {
      const result = await this.$API.singer.reqArtistDetail(id);
      if (result.code === 200) {
        this.artistDetail = result.data.artist;
      }
    },

    // 获取歌手的专辑
    async getArtistAlbum(id, limit) {
      let offset = (this.currentPage - 1) * limit;
      const result = await this.$API.singer.reqArtistAlbum(id, limit, offset);
      if (result.code === 200) {
        let ArtistAlbums = result.hotAlbums;
        this.isMore = result.more;

        ArtistAlbums.forEach((item) => {
          this.getAlbumDetail(item.id);
        });
      }
    },

    // 获取歌手描述
    async getArtistDesc(id) {
      const result = await this.$API.singer.reqArtistDesc(id);
      this.introduction = result.introduction;
    },

    // 获取歌手MV
    async getArtistMv(id) {
      let limit = 20;
      let offset = (this.currentMvPage - 1) * limit;
      const result = await this.$API.singer.reqArtistMv(id, limit, offset);
      this.ArtistMvs = this.ArtistMvs.concat(result.mvs);
      this.isHasMoreMv = result.hasMore;
    },

    // 获取专辑详情
    async getAlbumDetail(id) {
      const result = await this.$API.singer.reqAlbumDetail(id);
      if (result.code === 200) {
        let songs = result.songs;
        // 将songs包装成对象(不改变原数据)
        result.songsObj = { songs };
        this.AlbumDetail.push(result);
      }
    },

    // 获取歌手热门50首歌曲
    async getArtistTopSong(id) {
      const result = await this.$API.singer.reqArtistTopSong(id);
      if (result.code === 200) {
        let artistTopSong = result.songs;

        // 将artistTopSong转化为对象,isViewTotal是否展开显示全部
        this.artistTopSong = { artistTopSong, isViewTotal: false };
      }
    },

    // 获取相似歌手
    async getSimiArtist(id) {
      const result = await this.$API.singer.reqSimiArtist(id);
      if (result.code === 200) {
        this.simiArtist = result.artists;
      }
    },

    // 展开热门50首
    toggleRowExpansion() {
      this.artistTopSong.isViewTotal = true;
      this.isShowCheckAll = false;
    },

    // 显示专辑歌单详情
    albumPlaylistDetail({ listId }) {
      this.$router.push({ name: "album", query: { id: listId } });
    },

    // 自定义事件，路由跳转
    changeRoute(id) {
      this.$router.push({ path: "/mvDetail", query: { id } });
    },

    // 自定义事件
    goRouteSingerDetail(id) {
      this.$router.push({
        path: "/singerDetail",
        query: { id },
      });
    },
    // 处理index
    handleIndex(index) {
      index += 1;
      if (index < 10) {
        return "0" + index;
      } else {
        return index;
      }
    },

    // 专辑无限滚动加载
    load() {
      this.currentPage += 1;
      this.getArtistAlbum(this.$route.query.id, this.limit);
    },

    // mv滚动加载
    infiniteMv() {
      this.currentMvPage += 1;
      this.getArtistMv(this.$route.query.id);
    },

    // 点击tab栏切换
    handleClick(tab) {
      // 防止各自的滚动事件同时发生
      if (tab.name != "first") {
        this.isShowAlbum = false;
      } else {
        this.isShowAlbum = true;
      }

      if (tab.name == "second") {
        this.isShowMv = true;
      } else {
        this.isShowMv = false;
      }
    },
  },
  components: { UserItem, listTable, Description, ListItem },
  watch: {
    "$route.query"(value) {
      this.reload();
    },
  },
};
</script>

<style lang="less" scoped>
.album-wrapper {
  margin-top: 20px;
}
/deep/.simiArtist {
  text-align: left;
  justify-content: flex-start;
  .list-item {
    width: 200px;
    margin-right: 15px;
    .cover {
      aspect-ratio: 1/1;
    }
    &:nth-child(6n) {
      margin: 0;
    }
  }
}

/deep/.ArtistMvs {
  text-align: left;
  justify-content: flex-start;
  .list-item {
    width: 25vw;
    max-width: calc(100% / 5);
    .cover {
      aspect-ratio: 2/1;
    }
    &:nth-child(5n) {
      margin: 0;
    }
  }
}
</style>
