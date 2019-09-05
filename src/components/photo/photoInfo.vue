<template>
    <div class="info-content">
        <h3>{{info[0].title}}</h3>
        <div class="info-box">
            <span>发表时间：{{info[0].add_time | dateString}}</span>
            <span>点击次数：{{info[0].click}}次</span>
        </div>

        <hr>
        <div class="thumbs">
            <vue-preview :slides="list" @close="handleClose"></vue-preview>
        </div>




        <div class="info-message" v-html="info[0].content"></div>
        <hr>

        <cmt-box :id="this.id" ></cmt-box>
    </div>




</template>


<script>
    import comment from "../subcomponents/comment.vue"
    export default {
        data(){
            return{
                info:{},
                list:[],
                id: this.$route.params.id,
            }
        },
        methods:{
            getPhotoInfo(id){
                this.axios.get("/api/getimageInfo/" + id)
                    .then(res =>{
                        this.info = res.data.message
                    })
            },
            getPhoto(){
                this.axios.get("/api/getthumimages/" + this.id)
                    .then(res =>{
                        this.list = res.data.message
                        this.list.forEach(item => {
                            item.w = 300
                            item.h = 300
                            item.msrc = item.src
                        })
                    })
            }

        },
        created() {
            this.getPhotoInfo(this.id)
            this.getPhoto()
        },
        components:{
            'cmt-box' : comment
        },

    }


</script>


<style lang="scss" scoped>
    .info-content{
        h3{
          font-size:20px;
           text-align: left;
            padding: 2px 5px;
            margin: 0;
        }
        .info-box{
            font-size: 14px;
            display: flex;
            justify-content: space-between;
            padding: 0 5px;
        }
        .info-message{
            font-size: 15px;
            text-indent: 2em;
            padding: 0 5px;
        }
    }
    .thumbs {
        /deep/ .my-gallery { //deep深层作用选择器
            display: flex;
            flex-wrap: wrap; //默认换行
            figure {
                width: 30%;
                margin:5px;


                img {
                    width: 100%;
                    box-shadow: 0 0 8px #999;
                    border-radius: 5px;
                }
            }
        }
    }
</style>