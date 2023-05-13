<script>
import Component from "./components/Component.vue"
import {provide} from 'vue'
export default {
    data(){
        return {
            message:"sasssa"
        }
    },
    setup(){
       provide("rank","silver")
    },
    methods:{
        customized(val){
            console.log(val)
        }
    },
    components:{
        Component
    }
}
</script>
<template>
  <div>
    <Component :message="message"></Component>
    <button @click="message='hello'">Change Message</button>
    <Component @customized="customized"></Component>
  </div>
</template>




<style>

</style>