<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
  
  </div>
 <!--  <div>
     <h2>获得所有数据</h2>
    <p v-for="n in listData.arr" :key="n.user_id">
        {{n.user_name}}
    </p> 
  </div> -->
  <div>
    <h2>搜索</h2>
    <input type="text" v-model="searchKey"/> 
    <input type="button" value="search" @click="searchVal">
    <ul>
      <li v-for="n in searchResult.arr" :key="n.user_id">
        {{n.user_name}}——{{n.user_job}}
      </li>
    </ul>
  </div>
  <div>
    <h2>插入数据</h2>
    <p>
      输入name:
      <input type="text" v-model="insertName">
    </p>
    <p>
      输入job: 
      <input type="text" v-model="insertJob">
    </p>
    <input type="button" value="submit" @click="insertBtn"/>
  </div>
  <!-- 删除 -->
  <div>
    <ListVue v-for="n in listData.arr" :key="n.user_id" :idVal='n.user_id' :nameVal='n.user_name' :jobVal='n.user_job' @refreshData="getAllFn"></ListVue>
  </div>
</template>

<script>
import ListVue from './List.vue';
import axios from 'axios'; 
import { ref, reactive, onBeforeMount } from 'vue';
export default {
  name: 'HelloWorld',
  /* props: {
    msg: String
  } */
  data(){
    return {
      msg:'Vue3+mysql'
    }
  },
  components:{
    ListVue
  },
  setup(){
    
    let listData = reactive({
      arr:[]
    })
    let searchResult =reactive({
      arr:[]
    })
    onBeforeMount(()=>{
     getAllFn();
     console.log('2');
    })
    //获取列表数据
    function getAllFn(){
      axios.get('/api/query')
      .then(d=>{
        listData.arr = d.data;
      })
    }
    //插入数据
    let insertName = ref();
    let insertJob = ref();
    let searchKey = ref();
    function insertBtn(){
      
      axios.get('/api/check',{
        params:{
          checkName:insertName.value
        }
      })
      .then(_d=>{
        if(_d.data.length>0){
          console.log('repeat');
          insertName.value='';
          insertJob.value='';
        }else{
          axios.get('/api/insert',{
            params:{
              name:insertName.value,
              job: insertJob.value
            }
          })
          .then(()=>{
            getAllFn();
            insertName.value='';
            insertJob.value='';
          });
        }
      })
      
    }
    
    //搜索数据
    function searchVal(){
      
      axios.get('/api/search',{
        params:{
          sKey:searchKey.value
        }
      })
      .then(d=>{
          searchResult.arr=d.data;
          searchKey.value='';     
      })
  
    }
  
    
    return{
      getAllFn,
      searchVal,
      insertBtn,
      listData,
      searchResult,
      insertName,
      insertJob,
      searchKey
    }
  },
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
