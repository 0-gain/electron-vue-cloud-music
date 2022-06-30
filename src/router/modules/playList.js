let playListRoutes = [
  {
    path: "/likeMusic",
    name: "LikeMusic",
    component: () => import("@/pages/Playlist/LikeMusic.vue"),
    meta: { title: "我喜欢的音乐", icon: "icon-heart-line" },
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
