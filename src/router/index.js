import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);



import { discover } from "./modules/discover";
import { video } from "./modules/video";
import {follow} from './modules/follow';
import { livestream } from "./modules/Livestream";
import { fm } from "./modules/fm";
import { myMusicRoutes } from "./modules/myMusic";
import { playListRoutes } from "./modules/playList";
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
        ...livestream,
        ...fm,
        ...myMusicRoutes,
        ...playListRoutes
      ],
    },
  ],
  
});
export default router;
