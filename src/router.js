import VueRouter from "vue-router"
import home from  "./components/tabbar/home.vue"
import member from  "./components/tabbar/member.vue"
import search from  "./components/tabbar/search.vue"
import shop from  "./components/tabbar/shop.vue"
import newList from "./components/tabbar/news/newList.vue"
import newInfo from "./components/tabbar/news/newinfo.vue"
import photoList from "./components/photo/photoList.vue"
import photoInfo from "./components/photo/photoInfo.vue"
import shopInfo from "./components/shop/shopInfo.vue"
import allInfo from "./components/shop/allInfo.vue"
import shopComment from "./components/shop/shopComment.vue";
import shopALlInfo from "./components/shop/shopALlInfo.vue";

let router = new VueRouter({
    routes:[
        {path:"/",redirect:"/home"},
        {path:"/home",component:home},
        {path:"/member",component:member},
        {path:"/search",component:search},
        {path:"/shop",component:shop},
        {path:"/home/newList",component:newList},
        {path:"/home/newInfo/:id",component:newInfo},
        {path:"/home/photoList",component:photoList},
        {path:"/home/photoList/:id",component:photoInfo},
        {path:"/home/shopInfo",component:shopInfo},
        {path:"/home/shopInfo/:id",component:allInfo,name:'shopping'},
        {path:"/home/shopComment/:id",component:shopComment,name:"shopComment"},
        {path:"/home/shopALlInfo/:id",component:shopALlInfo,name:"shopALlInfo"}

    ],
    linkActiveClass:"mui-active" // 覆盖默认的高亮类
})

export default router