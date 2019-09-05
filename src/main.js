import Vue from "vue"
import app from "./App.vue"
Vue.config.devtools = true;
// import { Swipe, SwipeItem } from 'mint-ui';
//导入路由的包
import VueRouter from "vue-router"
Vue.use(VueRouter)
//导入mint-ui的包
// import { Header,Swipe, SwipeItem,Lazyload} from 'mint-ui';
// Vue.component(Swipe.name, Swipe);
// Vue.component(SwipeItem.name, SwipeItem);
// Vue.component(Header.name, Header);
// Vue.use(Lazyload)
import MintUI from "mint-ui"
import "mint-ui/lib/style.css"
Vue.use(MintUI)

import "./lib/mui/css/mui.css"
import "./lib/mui/css/icons-extra.css"

//定于全局过滤器
import moment from "moment"
Vue.filter("dateString",function(dataStr,pattern= "YYYY-MM-DD HH-mm-ss"){
    return moment(dataStr).format(pattern)
})

//导入自己的router模块
import router from "./router.js"

import axios from "axios"
Vue.prototype.axios = axios
axios.defaults.baseURL = 'http://www.liulongbin.top:3005';
//不能用Vue.use来挂载，把axios挂载到Vue的原型上

import VuePreview from 'vue-preview'
Vue.use(VuePreview)

import Vuex from "vuex"
Vue.use(Vuex)

let message = JSON.parse(localStorage.getItem("message") || '[]')
let store = new Vuex.Store({
    state:{  //在组件中访问store中的数据用$store.state.count来访问
        message:message
    }, //相当于组件中的data
    mutations:{//相当于组件中的methods，要操作state中的值，要用mutation操作，不推荐在组件中修改数据
        getMessage(state, msg){//组件中调用这个方法用this.$store.commit("方法名")
            let flag = false
            state.message.some(item => {
                if(item.id == msg.id){
                    item.num += parseInt(msg.num)
                    flag = true
                    return true
                }
            })
            if(flag === false){
                state.message.push(msg)
            }
            localStorage.setItem("message",JSON.stringify(state.message))
        },
        updateMessage(state,info){
            state.message.some(item => {
                if(item.id == info.id){
                    item.num = parseInt(info.value)
                    return true;
                }
            })
            localStorage.setItem("message",JSON.stringify(state.message))
        },
        deleteMessage(state,id){
            state.message.some(item => {
                if(item.id == id){
                    state.message.splice(item,1)
                    return true
                }
            })
            localStorage.setItem("message",JSON.stringify(state.message))
        },
        updateSelected(state,value){
            state.message.some(item => {
                if(item.id == value.id){
                    item.selected = value.selected
                    return true
                }
            })
            localStorage.setItem("message",JSON.stringify(state.message))
        }
    },
    getters:{
        getALLCount(state){
            let c = 0
            state.message.forEach(item => {
                c += item.num
            })
            return c
        },
        getIdValue(state){
            let o = {}
            state.message.forEach(item => {
                o[item.id] = item.num
            })
            return o
        },
        getSelected(state){
            let o={}
            state.message.forEach(item => [
                o[item.id] = item.selected
            ])
            return o
        },
        makePrice(state){
            let o ={}
            let allNum = 0
            let allPrice = 0
            state.message.forEach(item => {
                if(item.selected == true){
                    allNum += item.num
                    allPrice += item.num * item.price
                }
            })
            o['allNum'] = allNum
            o['allPrice'] = allPrice
            return o
        }
    }
})


let vm = new Vue({
    el:"#app",
    render:c => c(app),
    router, //挂载路由对象
    store //将vuex创建的store挂载到实例上
})