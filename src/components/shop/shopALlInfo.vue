<template>
    <div>
        <h3 class="body-title">{{message.title}}</h3>
        <hr>
        <div class="content" v-html="message.content"></div>
    </div>

</template>


<script>
    export default {
        data(){
            return{
                id:this.$route.params.id,
                message:{}
            }
        },
        methods:{
            getALLInfo(){
                this.axios.get("/api/goods/getdesc/" + this.id)
                    .then(res => {
                        this.message = res.data.message[0]
                    })
            }
        },
        created() {
            this.getALLInfo()
        }
    }


</script>


<style lang="scss">
    .body-title{
        color: #007aff;
        font-size: 15px;
        text-align: center;
        margin: 15px 0 ;
    }
    .content{
        padding: 0 4px;
        img{
            width: 100%;
        }
    }



</style>