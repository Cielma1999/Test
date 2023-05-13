<template>
  <div>
    <p>Hello!</p>
    <p>This  is  message from {{message}}</p>
    <p>message is {{test}}</p>
    
  </div>

</template>

<script>
export default {
  data(){
    return{
    }
  },
  props:['message','test'],
 
}
</script>

<style>

</style>