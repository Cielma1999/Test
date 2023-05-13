<script>
import Hello from './Hello.vue'
import {onUpdated,toRefs,ref,inject}  from 'vue'
export default {
    data(){
        return{
            msg:"Component 's message."
        }
    },
    methods:{
        sendParent(){
        this.$emit('injectMsg',this.msg);
        }
    },
    components:{
        Hello
    },
    props:{
        message:{
            type:String,
            default:"I am fine"

        }
    },
    setup(props,context){
        /* console.log(props.message)
        const {message} = toRefs(props)
        console.log(message.value)
        onUpdated(()=>{
            console.log(message.value)
        }) */
        const counter = ref(20)
        function sendParent2(){
            context.emit("customized",counter.value)
        }
        const  rank = inject("rank")
        console.log(context.attrs)
        return{ sendParent2,rank }
    }
}

</script>
<template>
<div>
   
    
  <h1>This is Component.</h1>
  <h3>{{rank}}</h3>
  <h2>{{message}}</h2>
  <Hello :message="msg" test="not bind"></Hello> 
  <button @click="sendParent">submit to parent component</button>
  <!--parm test is not dynamic binded, so  we need to refresh the web page to show the " not bind "-->
  <slot></slot>
   <hr>
   <button @click="sendParent2">send  data</button>
</div>
</template>



<style>

</style>