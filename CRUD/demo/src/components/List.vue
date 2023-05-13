<template>
    <li>
        {{nameVal}}——{{jobVal}} 
        <input type="button" value="DELETE" @click="delBtn">
        <input type="button" :value='switchButton' @click="modiBtn">

        <!-- 修改菜单 -->
        <div v-if="ifModify">
            <input type="text" v-model="modifyObj">  <!-- 不能用:value='modifyObj' -->
            <input type="button" value="Confirm" @click="confirmBtn">
        </div>
    </li>
</template>
<script>
import axios from 'axios';
import { onBeforeMount, ref } from 'vue';

export default{
 name:'info-list',
 data(){
    return {
        msg:'child'
    }
 },
 props:{
    idVal:Number,
    nameVal:String,
    jobVal:String
 },
 setup(props,ctx){
    //删除
    onBeforeMount(()=>{
        console.log(1)
    });
    function delBtn(){
        axios.get('/api/del',{
            params:{
               delID:props.idVal 
            }
        })
        .then(()=>{
            ctx.emit('refreshData')
        });
    }
    let ifModify = ref(false);
    let switchButton = ref('Modify');
    let modifyObj = ref('');
    //修改
    function modiBtn(){
        ifModify.value = !ifModify.value;
        ifModify.value === true? switchButton.value='Cancel':switchButton.value='Modify';
        axios.get('/api/search-id',{
            params:{
                sId:props.idVal
            }
        })
        .then((d)=>{
            modifyObj.value = d.data[0].user_job
        })
        
    }
    //提交修改
    function confirmBtn(){
        axios.get('/api/confirm',{
            params:{
                mId:props.idVal,
                mjob:modifyObj.value
            }
        })
        .then(()=>{
            ctx.emit('refreshData');
            ifModify.value =false;
            switchButton.value = 'Modify';
        })
    }
    
    return {
        delBtn,
        modiBtn,
        confirmBtn,
        ifModify,
        switchButton,
        modifyObj
    }

 }
}
</script>

<style scoped>
ul,ol,li{
    list-style: none;
}

div {
    width:300px;
}

li{
    padding:10px 0;
    border: 1px solid #00f;
    margin: 10px;
}
</style>