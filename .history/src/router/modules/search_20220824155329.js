let searchRoutes = [
  {
    // 搜索列表
    path: "/search",
    name:'Search',
    component: () => import("@/pages/SearchList"),
    redirect: "/search/song",
    children: [
      {
        path: "song",
        name:'Song',
        component: () => import("@/pages/SearchList/Children/song.vue"),
      },
      {
        path: "artist/:keywords",
        name:'Artist',
        component: () => import("@/pages/SearchList/Children/artist.vue"),
      },
      {
        path: "album/:keywords",
        name:'Album',
        component: () => import("@/pages/SearchList/Children/album.vue"),
      },
      {
        path:'video/:keywords',
        name:'Video',
        component: () => import("@/pages/SearchList/Children/video.vue"),
      },
      {
        path:'playlist/:keywords',
        name:'Playlist',
        component: () => import("@/pages/SearchList/Children/playlist.vue"),
      },
      {
        path:'dj/:keywords',
        name:'Dj',
        component: () => import("@/pages/SearchList/Children/dj.vue"),
      },
      {
        path:'user/:keywords',
        name:'User',
        component: () => import("@/pages/SearchList/Children/user.vue"),
      },
    ],
  },
];

export { searchRoutes };
