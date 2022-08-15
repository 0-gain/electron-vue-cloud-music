let searchRoutes = [
  {
    // 搜索列表
    path: "/search",
    component: () => import("@/pages/SearchList"),
    redirect: "/search/song",
    children: [
      {
        path: "song",
        component: () => import("@/pages/SearchList/Children/song.vue"),
      },
      {
        path: "artist",
        component: () => import("@/pages/SearchList/Children/artist.vue"),
      },
      {
        path: "album",
        component: () => import("@/pages/SearchList/Children/album.vue"),
      },
      {
        path:'video',
        component: () => import("@/pages/SearchList/Children/video.vue"),
      },
      {
        path:'playlist',
        component: () => import("@/pages/SearchList/Children/playlist.vue"),
      },
      {
        path:'dj',
        component: () => import("@/pages/SearchList/Children/dj.vue"),
      },
      {
        path:'user',
        component: () => import("@/pages/SearchList/Children/user.vue"),
      },
    ],
  },
];

export { searchRoutes };
