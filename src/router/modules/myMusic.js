let myMusicRoutes = [
  {
    path: "/localOrDownload",
    name: "LocalOrDownload",
    component: () => import("@/pages/LocalOrDownload"),
    meta: { title: "本地与下载", icon: "icon-xiazai" },
  },
  {
    path: "/recentMusic",
    name: "RecentMusic",
    component: () => import("@/pages/RecentMusic"),
    meta: { title: "最近播放", icon: "icon--wall-clock" },
  },
];

let myMusicMap = [];
myMusicRoutes.forEach((route) => {
  let map = {
    path: route.path,
    name: route.name,
    meta: route.meta,
  };
  myMusicMap.push(map);
});
export { myMusicRoutes, myMusicMap };
