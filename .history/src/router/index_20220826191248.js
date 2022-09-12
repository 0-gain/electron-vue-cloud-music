import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

import { discover } from "./modules/discover";
import { video } from "./modules/video";
import { follow } from "./modules/follow";
import { fm } from "./modules/fm";
import { myMusicRoutes } from "./modules/myMusic";
import { searchRoutes } from "./modules/search";
// 引入Layout
import Layout from "@/Layout";
const router = new VueRouter({
  routes: [
    {
      path: "/",
      component: Layout,
      redirect: "/discover",
      children: [
        ...discover,
        ...video,
        ...follow,
        ...fm,
        ...myMusicRoutes,
        ...searchRoutes,
        {
          // 歌单详情
          path: "/playListDetail",
          name: "PlayList",
          component: () => import("@/pages/PlayListDetail/PlaylistDetail.vue"),
        },
        {
          // 每日歌曲推荐
          path: "/dailySongs",
          component: () => import("@/pages/PlayListDetail/DailyPlaylist.vue"),
        },
        {
          // 歌手详情
          path: "/singerDetail",
          component: () => import("@/pages/SingerDetail/SingerIndex.vue"),
        },
        {
          path: "/album",
          name: "album",
          component: () => import("@/pages/SingerDetail/Children/album.vue"),
        },
        {
          // 个人中心
          path: "/person",
          name: "Person",
          component: () => import("@/pages/Person"),
          redirect: "/person/createPlaylist",
          children: [
            {
              path: "createPlaylist",
              component: () => import("@/pages/Person/children/playlist.vue"),
            },
            {
              path: "column",
              component: () => import("@/pages/Person/children/column.vue"),
            },
            {
              path: "collection",
              component: () => import("@/pages/Person/children/collection.vue"),
            },
          ],
        },
        {
          path: "/empty",
          name: "Empty",
          component: () => import("@/pages/Empty"),
        },
      ],
    },

    {
      // 展开音乐详情
      path: "/playListCardDetail",
      name: "PlayListCardDetail",
      component: () => import("@/pages/PlayListDetail/PlaylistCardDetail.vue"),
    },
    {
      // mv详情
      path: "/mvDetail",
      name: "MvDetail",
      component: () => import("@/pages/MvDetail"),
      meta: { hidden: true },
    },
  ],
});
export default router;
