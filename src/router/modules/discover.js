let discover = [
  {
    path: "/discover",
    name: "discover",
    component: () => import("@/pages/Discover/discover.vue"),
    redirect: "/discover/recommend",
    meta: { title: "发现音乐" },
    children: [
      {
        path: "recommend",
        component: () => import("@/pages/Discover/recommend.vue"),
      },
      {
        path: "customize",
        component: () => import("@/pages/Discover/Customize"),
      },
      {
        path: "musicList",
        name: "MusicList",
        component: () => import("@/pages/Discover/MusicList"),
        redirect: "musicList/musicListIndex",
        children: [
          {
            path: "musicListIndex",
            component: () =>
              import(
                "@/pages/Discover/MusicList/musicListChildren/MusicListIndex.vue"
              ),
          },
          {
            path: "highQuality",
            component: () =>
              import(
                "@/pages/Discover/MusicList/musicListChildren/HighQuality.vue"
              ),
          },
        ],
      },
      {
        path: "rank",
        component: () => import("@/pages/Discover/Rank"),
      },
      {
        path: "singer",
        component: () => import("@/pages/Discover/Singer"),
      },
      {
        path: "newMusic",
        component: () => import("@/pages/Discover/NewMusic"),
      },
    ],
  },
];

// 整体暴露
export { discover };
