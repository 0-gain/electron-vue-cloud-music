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
        path: "artist",
        name:'Artist',
        component: () => import("@/pages/SearchList/Children/artist.vue"),
      },
      {
        path: "album",
        name:'Album',
        component: () => import("@/pages/SearchList/Children/album.vue"),
      },
      {
        path:'video',
        name:'Video',
        component: () => import("@/pages/SearchList/Children/video.vue"),
      },
      {
        path:'playlist',
        name:'Playlist',
        component: () => import("@/pages/SearchList/Children/playlist.vue"),
      },
      {
        path:'dj',
        name:'Dj',
        component: () => import("@/pages/SearchList/Children/dj.vue"),
      },
      {
        path:'user',
        name:'User',
        component: () => import("@/pages/SearchList/Children/user.vue"),
      },
    ],
  },
];

export { searchRoutes };
