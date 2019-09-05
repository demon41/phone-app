<template>
    <div>
        <ul class="mui-table-view">
            <li v-for="item in news" :key="item.id" class="mui-table-view-cell mui-media">
                <router-link :to="'/home/newInfo/'+ item.id">
                    <img class="mui-media-object mui-pull-left" :src="item.img_url">
                    <div class="mui-media-body">
                        <h1>{{item.title}}</h1>
                        <p class='mui-ellipsis'>
                            <span>发表时间：{{item.add_time | dateString}}</span>
                            <span>点击：{{item.click}}</span>
                        </p>
                    </div>
                </router-link>
            </li>

        </ul>
    </div>
</template>

<script>
    import {Toast} from "mint-ui"
    export default {
        data(){
            return{
                news:[]
            }
        },
        methods:{
            getNewsList(){
                this.axios.get("/api/getnewslist")
                    .then(res => {this.news = res.data.message})
                    .catch(error => Toast("获取数据失败"))
            }
        },
        created() {
            this.getNewsList()
        }
    }

</script>

<style scoped lang="scss">
  .mui-table-view{
      li{
          h1{
              font-size: 14px;
          }
          .mui-ellipsis{
              font-size: 12px;
              color:blue;
              display: flex;
              justify-content: space-between;
          }
      }
  }


</style>