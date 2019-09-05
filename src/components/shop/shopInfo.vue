<template>
    <div class="all-list">
        <div class="content-box" v-for="item in shoppingList" :key="item.id" @click="allInfo(item.id)">
            <img :src="item.img_url">
            <div class="photo-info">
                <div class="shop-content">
                    <h3>{{item.zhaiyao}}</h3>
                </div>
                <div class="bottom-info">
                    <div class="price">
                        <span class="new">¥{{item.sell_price}}</span>
                        <span class="old">¥{{item.market_price}}</span>
                    </div>
                    <div class="num-phone">
                        <span>热卖中</span>
                        <span>剩{{item.stock_quantity}}件</span>
                    </div>
                </div>
            </div>
        </div>

      <input type="button" value="加载更多" style="background-color: red" @click="nextShopInfo">
    </div>


</template>


<script>
    export default {
        data(){
            return{
                shoppingList:[],
                page:1
            }
        },
        methods:{
            getShopInfo(){
                this.axios.get("/api/getgoods?pageindex=" + this.page)
                    .then(res => {
                        this.shoppingList = this.shoppingList.concat(res.data.message)
                    })
            },
            nextShopInfo(){
                this.page ++
                this.getShopInfo()
            },
            allInfo(id){
                this.$router.push({name:"shopping",params:{id}})
            }
        },
        created() {
            this.getShopInfo()
        }
    }


</script>


<style lang="scss" scoped>
    .all-list{
        input{
            text-align: center;
            width: 100%;
            height: 40px;
            background-color: skyblue;
            color: white;
            font-size: 18px;
        }
        display: flex;
        flex-wrap: wrap;
        padding: 7px;
        justify-content: space-between;
        .content-box{
            border: 1px solid #ccc;
            box-shadow: 0 0 8px #ccc;
            width: 49%;
            margin: 3px 0;
            padding: 2px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            min-height: 293px;
            img{
                width: 100%;
            }
            .shop-content{
                h3{
                    font-size: 14px;
                }
            }
            .bottom-info{
                background-color: #eee;
                .price{
                    padding: 1px 12px;
                    .new{
                        font-size: 14px;
                        font-weight: bold;
                        color: red;
                    }
                    .old{
                        text-decoration: line-through;
                        font-size: 14px;
                        margin-left: 10px;
                    }
                }
                .num-phone{
                    font-size: 15px;
                    display: flex;
                    justify-content: space-between;
                    padding: 2px 10px;
                }
            }

        }
    }

</style>