let discover = [
    {
        path: "/discover",
        name: "discover",
        component:() => import("@/pages/Discover/discover.vue"),
        redirect: "/discover/recommend",
        meta: { title: "发现音乐" },
        children: [
          {
            path: "recommend",
            component: () => import("@/pages/Discover/recommend.vue"),
          },
          {
            path:'customize',
            component:() => import("@/pages/Discover/Customize")
          },
          {
            path:'musicList',
            component:() => import("@/pages/Discover/MusicList")
          },
          {
            path:'rank',
            component:() => import("@/pages/Discover/Rank")
          },
          {
            path:'singer',
            component:() => import("@/pages/Discover/Singer")
          },
          {
            path:'newMusic',
            component:() => import("@/pages/Discover/NewMusic")
          }
        ],
      }
]

// 整体暴露
export {discover}