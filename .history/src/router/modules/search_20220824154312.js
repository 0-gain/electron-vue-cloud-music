let searchRoutes = [
  {
    // 搜索列表
    path: "/search/:id",
    name:'Search',
    component: () => import("@/pages/SearchList"),
    redirect: "/search/song/:id",
    children: [
      {
        path: "song/:id",
        name:'Song',
        component: () => import("@/pages/SearchList/Children/song.vue"),
      },
      {
        path: "artist/:id",
        name:'Artist',
        component: () => import("@/pages/SearchList/Children/artist.vue"),
      },
      {
        path: "album/:id",
        name:'Album',
        component: () => import("@/pages/SearchList/Children/album.vue"),
      },
      {
        path:'video/:id',
        name:'Video',
        component: () => import("@/pages/SearchList/Children/video.vue"),
      },
      {
        path:'playlist/:id',
        name:'Playlist',
        component: () => import("@/pages/SearchList/Children/playlist.vue"),
      },
      {
        path:'dj/:id',
        name:'Dj',
        component: () => import("@/pages/SearchList/Children/dj.vue"),
      },
      {
        path:'user/:id',
        name:'User',
        component: () => import("@/pages/SearchList/Children/user.vue"),
      },
    ],
  },
];

export { searchRoutes };
