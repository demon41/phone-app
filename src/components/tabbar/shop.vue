<template>
    <div class="allContent">
        <div class="mui-card" v-for="(item,i) in shopInfo" :key="item.id">
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <mt-switch
                            v-model="$store.getters.getSelected[item.id]"
                            @change="changeSelected(item.id,$store.getters.getSelected[item.id])"
                    ></mt-switch>
                    <img :src="item.thumb_path" alt="">
                    <div class="shop-info">
                        <div class="shop-title">{{item.title}}</div>
                        <div>
                            <span class="shop-price">{{item.sell_price}}</span>
                            <newNum :countNum="$store.getters.getIdValue[item.id]" :changeCount="item.id"></newNum>
                            <a class="shop-delete" @click.prevent="deleteShop(item.id,i)">删除</a>
                        </div>

                    </div>
                </div>
            </div>
        </div>


        <div class="mui-card">
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <div class="left">
                        <p>总计{不含运费}</p>
                        <p>已勾选商品<span class="font">{{$store.getters.makePrice['allNum']}}</span>件，总价：<span class="font">¥{{$store.getters.makePrice['allPrice']}}</span></p>
                    </div>
                    <mt-button type="danger">去结算</mt-button>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    import newNum from "../subcomponents/newNum.vue"
    export default {
        data(){
            return{
                value:false,
                shopInfo:[],
            }
        },
        methods:{
            getShopInfo(){
                let ids = []
                this.$store.state.message.forEach(item => {
                    ids.push(item.id)
                })
                if(ids.length <= 0){
                    return;
                }
                this.axios.get("/api/goods/getshopcarlist/" + ids.join(","))
                    .then( res => {
                        this.shopInfo = res.data.message
                    })
            },
            deleteShop(id,i){
                this.$store.commit("deleteMessage",id)
                this.shopInfo.splice(i,1)

            },
            changeSelected(id,value){
                this.$store.commit("updateSelected",{id:id,selected:value})
            }
        },
        created() {
            this.getShopInfo()
        },
        components:{
            newNum
        }
    }

</script>

<style lang="scss" scoped>
    .allContent{
        background-color: #efeff4;
        overflow: hidden;
    }
    .mui-card-content-inner{
        display: flex;
        align-items: center;
        justify-content: space-between;
        img{
            width: 60px;
            height: 60px;
        }
        .shop-info{
            padding-left: 5px;
            .shop-title{
                font-size: 13px;
            }
            .shop-price{
                color: red;
                font-weight: bold;
            }
            .shop-delete{
                color: #007aff;
            }
        }
    }
    .font{
        font-weight: bold;
        font-size: 16px;
        color: red;
    }

</style>