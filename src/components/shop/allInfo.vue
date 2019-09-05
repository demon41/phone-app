<template>
    <div class="goods-info">
        <transition
                @before-enter="beforeEnter"
                @enter = "enter"
                @after-enter="afterEnter">
            <div class="ball" v-show="isShow" ref="ball"></div>
        </transition>

        <div class="mui-card">
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <swiper :img="img" :isfull="false"></swiper>
                </div>
            </div>
        </div>


        <div class="mui-card">
            <div class="mui-card-header">{{body.title}}</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <div class="price">
                        <span class="old-price">市场价：¥{{body.market_price}}</span>
                        <span class="new-price">销售价：¥{{body.sell_price}}</span>
                    </div>
                    <div class="number">
                        购买数量：
                       <num @getSel="getSel" :max="body.stock_quantity"></num>
                    </div>
                    <div class="shopping">
                        <input type="button" value="立即购买" style="background-color: #007aff;color: white">
                        <input type="button" value="加入购物车" style="background-color: red;color: white" @click="addShop">
                    </div>
                </div>
            </div>
        </div>

        <div class="mui-card">
            <div class="mui-card-header">商品参数</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner data-content">
                    <div class="body">商品货号：{{body.goods_no}}</div>
                    <div class="body">库存情况：{{body.stock_quantity}}件</div>
                    <div class="body">上架时间：{{body.add_time | dateString}}</div>
                </div>
            </div>
            <div class="mui-card-footer">
                <mt-button type="primary" size="large" plain @click="shopALlInfo(id)">商品介绍</mt-button>
                <mt-button type="danger" size="large" plain @click="information(id)">查看评论</mt-button>
            </div>
        </div>

    </div>

</template>


<script>
    import swiper from "../subcomponents/swiper.vue";
    import num from "../subcomponents/num.vue"
    export default {
        data(){
            return{
                id:this.$route.params.id,
                img:[],
                body:[],
                isShow:false,
                count:1
            }
        },
        methods:{
            getInfo(){
                this.axios.get("/api/getthumimages/" + this.id)
                    .then(res => {
                        res.data.message.forEach(item => {
                            item.img = item.src
                        })
                        this.img = res.data.message
                    })
            },
            getBody(){
                this.axios.get("/api/goods/getinfo/" + this.id)
                    .then(res => {
                        this.body = res.data.message[0]
                    })
            },
            information(id){
                this.$router.push({name:"shopComment", params:{id}})
            },
            shopALlInfo(id){
                this.$router.push({name:"shopALlInfo", params:{id}})
            },
            addShop(){
                this.isShow = !this.isShow
                let goodsInfo = {
                    id:this.id,
                    price:this.body.sell_price,
                    num:this.count,
                    selected:true,
                }
                this.$store.commit("getMessage",goodsInfo)
                console.log(this.body)
            },
            beforeEnter(el){
                el.style.transform="translate(0,0)"
            },
            enter(el,done){
                el.offsetWidth
                const badge = document.getElementById("badge").getBoundingClientRect()
                const ball = this.$refs.ball.getBoundingClientRect()
                const positionTop = badge.top - ball.top
                const positionLeft = badge.left - ball.left

                el.style.transform=`translate(${positionLeft}px,${positionTop}px)`
                el.style.transition = "all 0.5s cubic-bezier(.4,-0.3,1,.68)"
                done()
            },
            afterEnter(el){
                this.isShow = !this.isShow
        },
            getSel(count){
                this.count = count
            }

        },
        created(){
            this.getInfo()
            this.getBody()
        },
        components:{
            swiper,
            num
        },
    }


</script>


<style lang="scss" scoped>
    .goods-info{
        background-color: #eee;
        overflow: hidden;
    }
    .price{
        margin-bottom: 5px;
        font-weight: bold;
        font-size: 14px;
        .old-price{
            text-decoration: line-through;
            margin-right: 8px;
        }
        .new-price{
            color: red;
            font-size: 17px;
        }
    }
    .number{
        margin: 5px;
    }
    .data-content{
        color: #8f8f94;
        .body{
            margin: 5px;
        }
    }
    .mui-card-footer{
        display: block;
        font-size: 18px;
        button{
            margin: 15px 0;
        }
    }
    .shopping{
        margin-top: 10px;
    }
    .ball{
        background-color: red;
        width: 15px;
        height: 15px;
        border-radius: 50%;
        position: absolute;
        z-index: 50;
        left: 161px;
        top: 382px
    }


</style>