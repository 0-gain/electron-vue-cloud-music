let video = [
    {
        path:'/video',
        name:'video',
        component:() => import('@/pages/Video'),
        redirect:'/video/videoIndex',
        meta:{title:'视频'},
        children:[
            {
                // 独家放送列表
                path:'privateContentList',
                name:'PrivateContentList',
                component:() => import('@/pages/Video/Children/PrivateContentlist.vue'),
                meta:{hiddenNav:true}
            },
            {
                // 视频首页
                path:'videoIndex',
                name:'VideoIndex',
                component:() => import('@/pages/Video/Children/VideoIndex.vue')
            },
            {
                // MV首页
                path:'mvIndex',
                name:'MVIndex',
                component:() => import('@/pages/Video/Children/mv/MVIndex.vue')
            },
            {
                // mv种类页
                path:'mvSort',
                name:'MVSort',
                component:() => import('@/pages/Video/Children/mv/MvSort.vue'),
                meta:{changeNav:'true',name:'全部MV'}
            },
            {
                // mv排行榜
                path:'mvRank',
                name:'MVRank',
                component:() => import('@/pages/Video/Children/mv/MVRank.vue'),
                meta:{changeNav:'true',name:'MV排行榜'}
            },
        ]
    }
]
export {video}