<template>
    <div class="app-container">
<!--   顶部 Header区域     -->
        <mt-header fixed title="第一个软件">
            <router-link to="/" slot="left">
                <mt-button @click="backButton" v-show="flag">返回</mt-button>
            </router-link>
<!--            <mt-button icon="more" slot="right"></mt-button>-->
        </mt-header>
<!--   中间路由 router-view区域     -->
        <transition>
            <router-view></router-view>
        </transition>



<!--   底部 Tabbar区域     -->
        <nav class="mui-bar mui-bar-tab">
            <router-link class="mui-tab-item-lib" to="/home">
                <span class="mui-icon mui-icon-home"></span>
                <span class="mui-tab-label">首页</span>
            </router-link>
            <router-link class="mui-tab-item-lib" to="/member">
                <span class="mui-icon mui-icon-contact"></span>
                <span class="mui-tab-label">会员</span>
            </router-link>
            <router-link class="mui-tab-item-lib" to="/shop">
                <span class="mui-icon mui-icon-extra mui-icon-extra-cart">
                    <span class="mui-badge" id="badge">{{$store.getters.getALLCount}}</span>
                </span>
                <span class="mui-tab-label">购物车</span>
            </router-link>
            <router-link class="mui-tab-item-lib" to="/search">
                <span class="mui-icon mui-icon-search"></span>
                <span class="mui-tab-label">搜索</span>
            </router-link>
        </nav>



    </div>

</template>


<script>
    export default {
        data(){
            return{
                flag:false
            }
        },
        created(){
            this.flag = this.$route.path ==="/home"?false : true
        },
        methods:{
            backButton(){
                this.$router.go(-1)
            }
        },
        watch:{
            "$route.path":function (newVal) {
                if(newVal === "/home"){
                    this.flag = false
                }else {
                    this.flag = true
                }
            }
        }
    }


</script>

<style lang="scss" scoped>
    .mint-header{
        z-index: 20;
    }
    .app-container{
        padding-top: 40px;
        padding-bottom: 50px;
        overflow-x:hidden;
    }
    .mui-bar{
        -webkit-box-shadow: 0 0 2px rgba(0,0,0,.1);
    }
    .v-enter{
        opacity: 0;
        transform: translateX(100%);
    }
    .v-leave-to{
        opacity: 0;
        transform: translateX(-100%);
        position: absolute;
    }
    .v-enter-active,.v-leave-active{
        transition:all 0.5s ease
    }

    .mui-bar-tab .mui-tab-item-lib.mui-active {
        color: #007aff;
    }
    .mui-bar-tab .mui-tab-item-lib {
        display: table-cell;
        overflow: hidden;
        width: 1%;
        height: 50px;
        text-align: center;
        vertical-align: middle;
        white-space: nowrap;
        text-overflow: ellipsis;
        color: #929292;
    }
    .mui-bar-tab .mui-tab-item-lib .mui-icon {
        top: 3px;
        width: 24px;
        height: 24px;
        padding-top: 0;
        padding-bottom: 0;
    }
    .mui-bar-tab .mui-tab-item-lib .mui-icon ~ .mui-tab-label {
        font-size: 11px;
        display: block;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .gomeImgLoad{
        width: 100%;
    }
</style>