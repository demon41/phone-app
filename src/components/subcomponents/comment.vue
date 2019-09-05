<template>
    <div class="content-box">
        <h3>发表评论</h3>
        <hr>
        <textarea cols="26" rows="5" v-model="msg"></textarea>
        <input type="button" value="发表内容" @click="reportComment">
        <div class="cmt-list" v-for="(item,index) in comment" :key="index">
            <div class="cmt-item">
                <div class="cmt-title">
                    <span>{{item.user_name}}</span>
                    <span>{{item.add_time | dateString}} </span>
                </div>
                <div class="cmt-body">
                   {{item.content}}
                </div>
            </div>
        </div>
        <input type="button" value="加载更多" style="background-color: red" @click="nextComment">
    </div>

</template>


<script>
    import {Toast} from "mint-ui"
    export default{
        data(){
            return{
                pageIndex:1,
                comment:[],
                msg:""
            }
        },
        props:["id"],
        methods:{
            getComment(){
                this.axios.get("/api/getcomments/"+ this.id +"?pageindex=" + this.pageIndex)
                    .then(res => {this.comment = this.comment.concat(res.data.message)})
                    .catch(error => {Toast("加载评论失败")})
            },
            nextComment(){
                this.pageIndex ++
                this.getComment()
            },
            reportComment(){
                if(this.msg === ""){
                    return Toast("评论内容不能为空")
                }
                this.axios.post("/api/postcomment/" + this.id,{
                    content:this.msg.trim()
                })
                    .then(res => {
                        let cmt ={
                            user_name:"匿名用户",
                            add_time:Date.now(),
                            content:this.msg.trim()
                        };
                        this.comment.unshift(cmt);
                        Toast("发表成功");
                        this.msg = ""
                    })
            }
        },
        created() {
            this.getComment()
        }
    }

</script>


<style lang="scss" scoped>
    .content-box{
        padding-bottom: 50px;
        textarea{
            padding:0;
            margin: 0;
        }
        input{
            text-align: center;
            width: 100%;
            height: 40px;
            background-color: skyblue;
            color: white;
            font-size: 18px;
        }
        .cmt-list{
            .cmt-item{
                .cmt-title{
                    font-size: 10px;
                    width: 100%;
                    background-color: #ccc;
                    padding:2px 5px;
                    margin-top:2px;
                }
                .cmt-body{
                    line-height: 35px;
                    text-indent: 2em;
                    margin-right: 5px;
                }
            }
        }
    }

</style>