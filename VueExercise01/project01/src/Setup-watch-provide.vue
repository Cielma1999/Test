<script>
import Component from "./components/Component.vue"
import {computed, reactive, ref, watch, watchEffect} from  'vue'
export default {
    data(){
        return{
            msgFromChild:""
        }
    },
    methods:{
        getChild(va){
            console.log(va);
            this.msgFromChild = va;
        }
    },
    setup(){
        const counter = ref(1)
        function changeCounter(){
            counter.value++
        }
        const user = reactive({
            name:"ciel",
            age:18
        })
        function changeName(){
            user.name="liz"
        }
        watch(counter,(newVal,oldVal)=>{
            console.log("new",newVal)
            console.log("old",oldVal)
        })
        /* watch(user,(newVal,oldVal)=>{
            console.log("new",newVal)
            console.log("old",oldVal)
        }) */
        watchEffect(()=>{
            console.log(user.name)
        })
        const  msg = ref("Hello World")
        const reverse = computed(()=>{
            return msg.value.split("").reverse().join("")
        }) 
        console.log(reverse.value)
        return  {
            counter,changeCounter,user,changeName
        }
    },
    watch:{
        messgage(newVal,oldVal){

        }
    },
    computed:{
        reverseMsg:function(){
            return  this.message.split("").reverse().join("")
        }
    },
    components:{
        Component

    }

}
</script>
<template>
<div>
  <Component  @injectMsg="getChild"></Component>
  <h1>{{msgFromChild}}</h1>
  <Component>111</Component>
  <hr>
  <h2>{{counter}}</h2>
  <button  @click="changeCounter">Change Counter</button>
  <h2>{{user.name}}</h2>
  <button @click="changeName">Change User name</button>
</div>

</template>

<style>

</style>