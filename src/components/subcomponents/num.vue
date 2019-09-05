<template>
    <div class="mui-numbox" data-numbox-min='0' :data-numbox-max="max" style="width: 130px;height: 28px;">
        <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
        <input id="text" class="mui-input-numbox" type="number" value="1" @change="countChange" ref="number"/>
        <button class="mui-btn mui-btn-numbox-plus" type="button" >+</button>
    </div>
</template>


<script>
    import mui from "../../lib/mui/js/mui.js"

    export default {
        methods:{
            countChange(){
                this.$emit("getSel",parseInt(this.$refs.number.value))
            }
        },
        mounted() {
            mui('.mui-numbox').numbox()
        },
        props:['max'],
        watch:{
            "max":function (newVal,oldVal) {
                mui('.mui-numbox').numbox().setOption("max",newVal)
            }
        }
    }
</script>


<style lang="scss" scoped>

</style>