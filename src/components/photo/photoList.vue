<template>
    <div>
        <div class="mui-content">
            <div id="slider" class="mui-slider">
                <div id="sliderSegmentedControl" class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
                    <div class="mui-scroll">
                        <a :class="['mui-control-item',item.id == 0 ? 'mui-active':'']" v-for="item in data" :key="item.id" @click="getImage(item.id)">
                            {{item.title}}
                        </a>

                    </div>
                </div>

            </div>
        </div>


        <ul class="img-box">
            <router-link v-for="item in img" :key="item.id" :to="'/home/photoList/' + item.id" tag="li">
                <img v-lazy="item.img_url">
                <div class="info-content">
                    <h3>{{item.title}}</h3>
                    <div>{{item.zhaiyao}}</div>
                </div>
            </router-link>
        </ul>
    </div>

</template>


<script>
    import mui from "../../lib/mui/js/mui.js"
    export default {
        data(){
            return{
                data:[],
                img:[]
            }
        },
        created(){
            this.getInfo()
            this.getImage(0)
        },
        mounted() {
            mui('.mui-scroll-wrapper').scroll({
                deceleration:0.0005
            })
        },
        methods:{
            getInfo(){
                this.axios.get("/api/getimgcategory")
                    .then(res => {
                        this.data = res.data.message
                        this.data.unshift({"title":"全部","id":0})
                    })
            },
            getImage(caseId){
                this.axios.get("/api/getimages/" + caseId)
                    .then(res => {
                        this.img = res.data.message
                    })
            },
        }
    }


</script>


<style lang="scss" scoped>
    * { touch-action: pan-y; }
    .img-box{
        padding:0 5px;
        margin: 0;
        list-style: none;
        li{
            margin-bottom: 5px;
            position: relative;
            img{
                vertical-align: middle;
                width: 100%;
                bottom: 0;
            }
            img[lazy="loading"]{
                width: 40px;
                height: 300px;
                margin:auto;
            }
            .info-content{
                max-height: 84px;
                color: white;
                background-color: rgba(0,0,0,0.4);
                position: absolute;
                bottom: 0;
                h3{
                    font-size: 14px;
                }
                div{
                    font-size: 13px;
                }
            }

        }

    }

</style>