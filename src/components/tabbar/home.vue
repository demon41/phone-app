<template>
    <div>
        <swiper :img="img" :isfull="true"></swiper>

        <ul class="mui-table-view mui-grid-view mui-grid-9">
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/home/newList">
                <img src="../../images/menu1(1).png" alt="">
                <div class="mui-media-body">新闻资讯</div></router-link></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/home/photoList">
                <img src="../../images/menu2.png" alt="">
                <div class="mui-media-body">图片分享</div></router-link></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/home/shopInfo">
                <img src="../../images/menu3.png" alt="">
                <div class="mui-media-body">商品购买</div></router-link></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                <img src="../../images/menu4.png" alt="">
                <div class="mui-media-body">留言反馈</div></a></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                <img src="../../images/menu5.png" alt="">
                <div class="mui-media-body">视频专区</div></a></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                <img src="../../images/menu6.png" alt="">
                <div class="mui-media-body">联系我们</div></a></li>
        </ul>
    </div>

</template>

<script>
    import {Toast} from "mint-ui"
    import swiper from "../subcomponents/swiper.vue";
    export default {
        data(){
            return{
                message:"",
                img:[]
            }
        },
        methods:{
            getLunbotu(){
                this.axios.get("/api/getlunbo")
                    .then(res => {
                        this.img = res.data.message
                    })
                    .catch(error => {Toast("加载轮播图失败")})
            }
        },
        created(){
            this.getLunbotu()
        },
        components:{
            swiper
        }
    }

</script>

<style lang="scss" scoped>
    .mui-grid-view{
        background-color: white;
        img{
            width: 60px;
            height: 60px;
        }
    }
    .mui-grid-view.mui-grid-9 .mui-table-view-cell{
        border: 0;
        .mui-media-body{
            font-size: 13px;
        }
    }


</style>