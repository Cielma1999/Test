

<script>
export default {
    data(){
        return{
            isActive:false,
            classObj:{
                color:true,
                bgcolor:true,
            },
            myObject:{
                title:"solo novice to master",
                rankPoint:14999,
                rankName:"Platium"
            }
        }
    },


}
</script>

<template>
  <div>
    <p class="color">showcase1</p>
    <p :class="{color:isActive}">showcase2</p>
    <p :class="classObj">showcase2</p>
    <ul >
        <li v-for="(value,k,index) in myObject" :key="index">
          {{index}} {{k}}: {{value}}  
        </li>
    </ul>
  </div>
</template>
<style>
.color{
    color: blue;
}
.bgcolor{
    background-color: aqua;
}
</style>