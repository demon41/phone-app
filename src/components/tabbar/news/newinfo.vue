<template>
    <div class="newsTable">
        <h3>{{newInfo.title}}</h3>
        <p>
            <span>发表时间：{{newInfo.add_time | dateString}}</span>
            <span>点击：{{newInfo.click}}次</span>
        </p>

        <hr>

        <div class="content" v-html="newInfo.content"></div>

        <comment-box :id="this.id"></comment-box>
    </div>

</template>


<script>
    import comment from "../../subcomponents/comment.vue"
    import {Toast} from "mint-ui"
    export default {
        data(){
            return{
                id: this.$route.params.id,//将url地址中的id挂载到data中
                newInfo:{},
            }
        },
        created(){
            this.getNewsInfo()
        },
        components:{
            'comment-box' : comment
        },
        methods:{
            getNewsInfo(){
                this.axios.get("/api/getnew/" + this.id)
                    .then(res => {
                        this.newInfo = res.data.message[0]
                        console.log(this.newInfo)
                    })
                    .catch(error => {
                        Toast("加载新闻失败")
                    })
            }
        }
    }

</script>


<style lang="scss" scoped>
    .newsTable{
        padding-left: 10px;
        padding-right: 10px;
        h3{
            font-size: 15px;
            color: red;
            text-align: center;
            margin: 10px 0;
        }
        p{
            display: flex;
            justify-content: space-between;
            color: blue;
        }
    }

</style>