<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import HelloWorld from './components/HelloWorld.vue'

</script>
<script>

export default{
  data(){
    return{
      num:0,
      name:"Hal",
      msg:"<h1>heading</h1>",
      id:"d1",
      url:"https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.jj20.com%2Fup%2Fallimg%2F4k%2Fs%2F02%2F2109242332225H9-0-lp.jpg&refer=http%3A%2F%2Fimg.jj20.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1660054023&t=f2bcd78b477bea1a2eda5a90be5ea61d",
      attributeName:"id",
      mouseEvent:"click",

      message:"Test Watch",
      user:{
        name:"Arthur",
        age:17,
      }
    }
  },
  methods:{
    changeName(){
      this.name="Verhulst"
    },
    changeColor(){
      this.id="d2"
    },
    changeSize(){
      if(this.attributeName=="id"){
        this.attributeName="class";
      }else{
        this.attributeName="id";
      }
    },
    hiMessage() {
      console.log("methods");
      return this.num > 0 ? 'Hi' : 'ByeBye';
    },
    changeContent(){
      if(this.message=="Test Watch"){
        this.message="Tested";
      }else{
        this.message="Test Watch";
      }
    }
  },
  computed:{
    helloMessage() {
      console.log("computed");
      return this.num > 0 ? 'Hello' : 'Bye';
    }
  },
  watch:{
    message:{
      immediate:true,
      handler(newValue){
        console.log(newValue);
      } 
    },
    /* user:{
      handler(newValue){
        console.log(newValue);
      },
      deep:true,
    } */
    "user.name":{  //only monitor the single attribute of the object
      handler(newValue){
        console.log(newValue);
      },
      //deep attribute can be ignored 
    }
  }
}
</script>
<template>
  <div>
    <img alt="Vue logo" src="./assets/logo.png" />
    <HelloWorld msg="Hello Vue 3 + Vite" />
    <p>ID:{{num}}</p>
    <p>name:{{name}}</p>
    <!--when data changed, the data limited by v-once will not change -->
    <p v-once>name(v-once):{{name}}</p>
    <button @click="changeName">change name</button>
    <!--output the content in HTML format-->
    <p>Using mustaches: {{ msg }}</p>
    <p>Using v-html directive: <span v-html="msg"></span></p>

    <p v-bind:id="id">v-bind showcase</p>
    <button @click="changeColor">Change font color</button>
    <button @click="id='d2'">Change font color 2</button>
    <img v-bind:src="url" alt="beach">
    <!--dynamic params-->
    <p v-bind:[attributeName]="id">v-bind dynamic attributeName</p>
    <button @click="changeSize">Change font size</button>

    <p  @[mouseEvent]="changeSize">dynamic event</p>
    <button @click="mouseEvent='mouseover'">Change  Event</button>

    <!--computed attributes-->
    <p>{{helloMessage}}</p>
    <p>{{helloMessage}}</p>
    <p>{{helloMessage}}</p>
    <p>{{hiMessage()}}</p>
    <p>{{hiMessage()}}</p>
    <hr>

    <!--v-model data bidirectional bindings-->
    <input type="text" v-model="message">
    <button @click="changeContent">Change Content</button>

    <input type="text" v-model="user.name">
    <button @click="user.name='Bob'">Change Content</button>
    
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
#d1 {
  color: aqua;
}
.d1 {
  font-size: 50px;
}
#d2 {
  color: blueviolet;
}
</style>
