let playListRoutes = [
  {
    path: "/likeMusic",
    name: "LikeMusic",
    component: () => import("@/pages/CreatePlayList/children/LikeMusic.vue"),
    meta: { title: "我喜欢的音乐", icon: "icon-aixin2" },
  },
];

let playListMap = [];
playListRoutes.forEach((route) => {
  let map = {
    path: route.path,
    name: route.name,
    meta: route.meta,
  };
  playListMap.push(map);
});
export { playListRoutes,playListMap };
