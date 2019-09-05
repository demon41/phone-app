<template>
    <div>
        <mt-swipe :auto="4000">
            <mt-swipe-item  v-for="item in img" :key="item.url">
                <img :src="item.img" alt="" :class="{full:isfull}">
            </mt-swipe-item>
            <!--            <mt-swipe-item>2</mt-swipe-item>-->
            <!--            <mt-swipe-item>3</mt-swipe-item>-->
        </mt-swipe>
    </div>

</template>


<script>
    export default {
        props:["img","isfull"]
    }


</script>


<style lang="scss" scoped>
    .mint-swipe{
        height: 200px;
        img{
            height: 100%;
        }
        .mint-swipe-item{
            text-align: center;
        }
    }
    .full{
        width: 100%;
    }
</style>